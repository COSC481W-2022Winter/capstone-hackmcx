import {dbClient} from '../db/db.js'

export async function getCaptions(req, res){
    dbClient
        .select('caption', 'average_rating', 'createdAt', 'id')
        .from('captions')
        .where('post_id', req.params.postId)
        .then(results => {
            if (results.length > 0)
                res.send(results)
            else{
                res.statusCode = 404
                res.send()
            }
        })
}

export async function postCaptions(req, res){
    const emptyCaption = !req.body.caption || /^\s*$/.test(req.body.caption);

    if (emptyCaption){
        res.statusCode = 400;
        res.send({error: "Caption cannot be missing or blank."});

        return
    }

    try{
        let id = (await dbClient.table('captions').insert({caption: req.body.caption, post_id: req.params.id, average_rating: 0, number_of_ratings: 0}))[0];
        res.statusCode = 201;
        res.header('Location',`${req.baseUrl}/${id}` );
        res.send();
    }catch(e){
        res.statusCode = 404;
        res.send({ error: e })
    }
}