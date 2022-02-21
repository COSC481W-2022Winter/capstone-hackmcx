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
    const notPicture = !req.body.imageUrl || !/(https?:\/\/.*\.(?:png|jpg|gif|svg))/i.test(req.body.imageUrl);
    const emptyTitle = !req.body.title || /^\s*$/.test(req.body.title);

    if(notPicture){
        res.statusCode = 400;
        res.send({error: "Invalid image URL: Image url is either missing or invalid."});

        return
    }

    if (emptyTitle){
        res.statusCode = 400;
        res.send({error: "Title cannot be missing or blank."});

        return
    }

    let id = (await dbClient.table('posts').insert({imageUrl: req.body.imageUrl, title: req.body.title}))[0];
    res.statusCode = 201;
    res.header('Location',`${req.baseUrl}/${id}` );
    res.send();
}