import {dbClient} from '../db/db.js'
import {isMissingOrWhitespace} from "../utils/validation.js";

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
    const emptyCaption = isMissingOrWhitespace(req.body.caption);
    const toLongCaption = req.body.caption.length > 2048;

    if (emptyCaption){
        res.statusCode = 400;
        res.send({error: "Caption cannot be missing or blank."});

        return
    }

    if (toLongCaption){
        res.statusCode = 400;
        res.send({error: "Caption to long."});

        return
    }

    try{
        let id = (await dbClient.table('captions').insert({caption: req.body.caption, post_id: req.params.postId, average_rating: 0, number_of_ratings: 0}))[0];
        res.statusCode = 201;
        res.header('Location',`${req.baseUrl}/${id}` );
        res.send();
    }catch(e){
        res.statusCode = 404;
        res.send({ error: e })
    }
}

export async function rateCaption(req, res){
    function err(message){
        res.statusCode = 400;
        res.send({error: message})
    }

    if (!req.body.hasOwnProperty("rating")){
        err('`rating` missing from request body.' +
            ' must be a number from 0 to 1.')
        return;
    }
    let rating = parseFloat(req.body.rating);
    if (Number.isNaN(rating)){
        err('`rating` must be a number from 0 to 1.')
        return;
    }
    if (rating > 1 || rating < 0){
        err('`rating` must be a number from 0 to 1.')
        return;
    }
    let results = await dbClient.select('average_rating', 'number_of_ratings')
        .from('captions')
        .where('id', req.params.captionId)
        .andWhere('post_id', req.params.postId)
    if (results.length < 1){
        res.statusCode = 404
        res.send('post or caption does not exist.')
        return
    }
    let votes = results[0].number_of_ratings
    let score = results[0].average_rating
    let newScore = (votes * score + rating) / (votes+1)
    await dbClient.table('captions')
        .where('id', req.params.captionId)
        .update({'average_rating': newScore, 'number_of_ratings': (votes + 1)})

    res.statusCode = 204 //No Content
    res.send()
}

