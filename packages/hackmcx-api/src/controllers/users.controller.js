import {dbClient} from '../db/db.js'
import {isMissingOrWhitespace} from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers(req, res){
    await dbClient
        .select('username', 'first_name', 'last_name', 'imageUrl')
        .from('users')
        .then(results => res.send(results));
}

export async function getUsersByUserId(req, res){
    dbClient
        .select('username', 'first_name', 'last_name', 'imageUrl')
        .from('users')
        .where('username', req.params.userId)
        .then(results => {
            if (results.length > 0)
                res.send(results[0])
            else{
                res.statusCode = 404
                res.send()
            }
        })
}

export async function postUser(req, res){
    const emptyUsername = !req.body.username || /^\s*$/.test(req.body.username);
    const emptyFirstName = !req.body.firstname || /^\s*$/.test(req.body.firstname);
    const emptyLastName = !req.body.lastname || /^\s*$/.test(req.body.lastname);    
    const noGivenImageUrl = !req.body.imageUrl;
    const notPicture = !req.body.imageUrl || !/(https?:\/\/.*\.(?:png|jpg|gif|svg))/i.test(req.body.imageUrl);

    if(emptyUsername){
        res.statusCode = 400;
        res.send({error: "Username cannot be missing or blank."});
        return
    }
    if(emptyFirstName){
        res.statusCode = 400;
        res.send({error: "First Name cannot be missing or blank."});
        return
    }
    if(emptyLastName){
        res.statusCode = 400;
        res.send({error: "Last Name cannot be missing or blank."});
        return
    }
    if(!noGivenImageUrl && notPicture){
        res.statusCode = 400;
        res.send({error: "Invalid image URL: Image url is invalid."});
        return
    }

    try{
        let id =  noGivenImageUrl ? 
                    (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname }))[0] :
                    (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, imageUrl: req.body.imageUrl}))[0]
        res.statusCode = 201;
        res.header('Location',`${req.baseUrl}/${id}` );
        res.send();
    }catch(e){
        if(e.message.includes('Duplicate entry')){
            res.statusCode = 400;
            res.send({error: "Invalid Username: Username is already taken."});
        }
        else{
           res.statusCode = 500;
           res.send();
        }
    }
}

export async function postLogin(req, res) {
    if (isMissingOrWhitespace(req.body.username)) {
        res.statusCode = 400;
        res.send({error: "Username cannot be missing or blank."});
        return
    }

    if (isMissingOrWhitespace(req.body.password)) {
        res.statusCode = 400;
        res.send({error: "Password cannot be missing or blank."});
        return
    }

    const results = await dbClient.from('users')
        .select('password')
        .where('username', req.body.username);

    if (results < 1 || !await bcrypt.compare(req.body.password, results[0].password)) {
        res.statusCode = 400;
        res.send({error: "Invalid username password combination."});
        return;
    }

    const wt = jwt.sign({
        user: req.body.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.AUTH_TOKEN_SECRET)

    res.statusCode = 200
    res.send({token: wt})
}