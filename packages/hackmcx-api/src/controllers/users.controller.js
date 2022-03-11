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
