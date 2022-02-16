import {dbClient} from '../db/db.js'

export async function getPosts(req, res){
    await dbClient
        .select('title', 'imageUrl', 'createdAt', 'id')
        .from('posts')
        .then(results => res.send(results));
}

export async function getPostById(req, res){
    dbClient
        .select('title', 'imageUrl', 'createdAt', 'id')
        .from('posts')
        .where('id', req.params.id)
        .then(results => {
            if (results.length > 0)
                res.send(results[0])
            else{
                res.statusCode = 404
                res.send()
            }
        })
}

export async function postPost(req, res){
    dbClient
        .insert(req.body).into('posts')
        .then(result => {
            res.statusCode = 201
            // TODO: Set location header... res.header('Location', req.)
            res.send(result)
        })
}