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
    await dbClient
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

function userValidation(req){
    const emptyUsername = !req.body.username || /^\s*$/.test(req.body.username);
    const emptyFirstName = !req.body.firstname || /^\s*$/.test(req.body.firstname);
    const emptyLastName = !req.body.lastname || /^\s*$/.test(req.body.lastname);
    const emptyPassword = !req.body.password || /^\s*$/.test(req.body.password);
    const notPicture = !req.body.imageUrl || !/(https?:\/\/.*\.(?:png|jpg|gif|svg))/i.test(req.body.imageUrl);
    const noGivenImageUrl = !req.body.imageUrl;

    if(emptyUsername){
        return "Username cannot be missing or blank.";
    }
    if(emptyFirstName){
        return "First Name cannot be missing or blank.";
    }
    if(emptyLastName){
        return "Last Name cannot be missing or blank.";
    }
    if(emptyPassword){
        return "Password cannot be missing or blank.";
    }
    if(!noGivenImageUrl && notPicture){
        return "Invalid image URL: Image url is invalid.";
    }
    else{
        return 1;
    }
}

export async function postUser(req, res){
    const validation = userValidation(req);

    if(validation != 1){
        res.statusCode = 400;
        res.send(validation);
        return;
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    try{
        let id =  !req.body.imageUrl ?
                    (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, password: hashPass }))[0] :
                    (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, password: hashPass, imageUrl: req.body.imageUrl}))[0]
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

export async function updateUsersByUserId(req, res){
    const validation = userValidation(req);

    if(validation != 1){
        res.statusCode = 400;
        res.send(validation);
        return;
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    let userExists = false;

    await dbClient
        .select('username', 'first_name', 'last_name', 'imageUrl')
        .from('users')
        .where('username', req.params.userId)
        .then(results => {
            if (results.length > 0){
                userExists = true;
            }
            else{
                userExists = false;
            }
        })

    if(userExists){
        if (req.user === req.params.userId) {
            try{
                let id =  !req.body.imageUrl ?
                            (await dbClient.table('users').where('username', req.params.userId).update({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, password: hashPass }))[0] :
                            (await dbClient.table('users').where('username', req.params.userId).update({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, password: hashPass, imageUrl: req.body.imageUrl}))[0]
                res.statusCode = 201;
                res.header('Location',`${req.baseUrl}/${id}` );
                res.send();
            }catch(e){
                res.statusCode = 500;
                res.send();
            }
        }
        else {
            res.statusCode = 403;
            res.send();
        }
    }
    else{
        postUser(req, res);
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
