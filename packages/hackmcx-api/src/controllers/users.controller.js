import {dbClient} from '../db/db.js'

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
    const usernameExists = (await dbClient.select('username').from('users').where('username', req.body.username)).length > 0 ? true : false;
    
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
    if(usernameExists){
        res.statusCode = 400;
        res.send({error: "Invalid Username: Username is already taken."});
        return
    }
    if(!noGivenImageUrl && notPicture){
        res.statusCode = 400;
        res.send({error: "Invalid image URL: Image url is either missing or invalid."});
        return
    }

    let id =  noGivenImageUrl ? 
                (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname }))[0] :
                (await dbClient.table('users').insert({username: req.body.username, first_name: req.body.firstname, last_name: req.body.lastname, imageUrl: req.body.imageUrl}))[0]
    res.statusCode = 201;
    res.header('Location',`${req.baseUrl}/${id}` );
    res.send();
}
