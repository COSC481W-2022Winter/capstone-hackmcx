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
    const imageURL = req.body.imageURL;
    const regex = /(https?:\/\/.*\.(?:png|jpg|gif|svg))/i;
    const isPicture = imageURL.match(regex)[0] === imageURL;
    const emptyTitle = /^\s*$/.test(req.body.title);

    if(isPicture && !emptyTitle) {
        dbClient
            .insert(req.body).into('posts')
            .then(result => {
                res.statusCode = 201
                // TODO: Set location header... res.header('Location', req.)
                res.send(result)
            })
    }
}