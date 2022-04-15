import {dbClient} from '../db/db.js'
import {isMissingOrWhitespace} from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers(req, res){
    await dbClient
        .select('username', 'first_name', 'last_name', 'imageData')
        .from('users')
        .then(results => res.send(results));
} 

export async function getUsersByUserId(req, res){
    await dbClient
        .select('username', 'first_name', 'last_name', 'imageData')
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
    let error = null
    isMissingOrWhitespace(req.body.username) && (error = "'username' cannot be missing or blank.")
    isMissingOrWhitespace(req.body.fistname) && (error = "'firstname' cannot be missing or blank.")
    isMissingOrWhitespace(req.body.lastname) && (error = "'lastname' cannot be missing or blank.")
    isMissingOrWhitespace(req.body.password) && (error = "'password' cannot be missing or blank.")
    req.body.username.length > 255 && (error = "'username' is too long")
    req.body.firstname.length > 255 && (error = "'firstname' is too long")
    req.body.lastname.length > 255 && (error = "'lastname' is too long")
    if (error !== null){
        sendClientError(error)
        return
    }

    try{
        if ((await dbClient.count().from('users').where('username', req.body.username)) > 0){
            sendClientError("user already exists!")
            return
        }

        let hashPass = await bcrypt.hash(req.body.password, await bcrypt.genSalt(12));

        // TODO: Move to transaction...
        await dbClient.table('accounts').insert({username: req.body.username, password: hashPass})
        let id =  !req.body.imageUrl ?
            (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname}))[0] :
            (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, imageUrl: req.body.imageData}))[0]
        res.statusCode = 201;
        res.header('Location',`${req.baseUrl}/${id}` );
        res.send();
    }catch (e){
        res.sendStatus(500)
    }
}

export async function updateUsersByUserId(req, res){
    let error = null
    isMissingOrWhitespace(req.body.fistname) && (error = "'firstname' cannot be missing or blank.")
    isMissingOrWhitespace(req.body.lastname) && (error = "'lastname' cannot be missing or blank")
    req.body.firstname.length > 255 && (error = "'firstname' is too long")
    req.body.lastname.length > 255 && (error = "'lastname' is too long")
    if (error !== null){
        sendClientError(error)
        return
    }

    if (req.params.userId !== req.user){
        res.sendStatus(403)
        return;
    }

    try{
        if (dbClient.count().from('users').where('username', req.user) < 0){
            res.sendStatus(404)
            return;
        }
        let id =  !req.body.imageUrl ?
            (await dbClient.table('users').where('username', req.params.userId)
                .update({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname
                }))[0] :
            (await dbClient.table('users').where('username', req.params.userId)
                .update({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    imageUrl: req.body.imageData
                }))[0]
        res.statusCode = 201;
        res.header('Location',`${req.baseUrl}/${id}` );
        res.send();
    }catch (e){
        res.sendStatus(500)
    }
}

export async function postLogin(req, res) {
    let error = null
    isMissingOrWhitespace(req.body.username) && (error = "Username cannot be missing or blank.");
    isMissingOrWhitespace(req.body.password) && (error = "Password cannot be missing or blank.")

    if (error !== null ){
        sendClientError(error)
        return
    }

    const results = await dbClient.from('accounts')
        .select('password')
        .where('username', req.body.username);

    if (results < 1 || !await bcrypt.compare(req.body.password, results[0].password)) {
        sendClientError("Invalid username password combination.")
        return;
    }

    const wt = jwt.sign({
        user: req.body.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.AUTH_TOKEN_SECRET)

    res.statusCode = 200
    res.send({token: wt})
}

export async function updatePassword(req, res){
    let error = null
    isMissingOrWhitespace(req.body.password) && (error = "'password' cannot be missing or blank.")
    if (error !== null){
        sendClientError(error)
        return
    }
    try{
        let hashPass = await bcrypt.hash(req.body.password, await bcrypt.genSalt(12));
        await dbClient.table('accounts').where('username', req.user)
            .update({password: hashPass})
    }catch (e){
        res.sendStatus(500)
    }
}

function sendClientError(res, errorMessage){
    res.statusCode = 400;
    res.send({error: errorMessage})
}
