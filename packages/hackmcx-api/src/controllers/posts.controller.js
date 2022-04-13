import {dbClient} from '../db/db.js'
import {isMissingOrWhitespace, isValidImageUrl} from "../utils/validation.js";

export async function getPosts(req, res){
    var finalResults;
    await dbClient
        .select('title', 'imageData', 'posts.createdAt', 'posts.id', 'caption')
        .from('posts')
        .leftOuterJoin('captions as c', function() {
          this.on('posts.id', '=', 'post_id')
          this.andOn('average_rating', '=', dbClient.raw('(select max(??) from ?? where ??=??)', ['average_rating', 'captions', 'post_id', 'c.post_id']))
        })
        .groupBy('posts.id')
        .then(results => {finalResults = results})

    finalResults.forEach(function (post, index) {
        if (post.caption === null) {
            delete finalResults[index].caption
        }
    })
    res.send(finalResults)
}

export async function getPostById(req, res){
    var finalResults
    await dbClient
        .select('title', 'imageData', 'createdAt', 'id')
        .from('posts')
        .where('id', req.params.postId)
        .then(results => {
            if (results.length > 0)
                finalResults = results[0]
            else{
                res.statusCode = 404
                res.send()
            }
        })
    await dbClient
        .select('caption', 'average_rating', 'createdAt', 'id')
        .from('captions')
        .where('post_id', req.params.postId)
        .then(results => {
            if (results.length > 0){
                finalResults.captions = results;
            }
            res.send(finalResults) 
        })
}

export async function postPost(req, res){
    const noPicture = isMissingOrWhitespace(req.body.imageData);
    const emptyTitle = isMissingOrWhitespace(req.body.title);
    const tooLongTitle = req.body.title.length > 255;

    if(noPicture){
        res.statusCode = 400;
        res.send({error: "No image uploaded."});

        return
    }

    if (emptyTitle){
        res.statusCode = 400;
        res.send({error: "Title cannot be missing or blank."});

        return
    }

    if(tooLongTitle){
        res.statusCode = 400;
        res.send({error: "Title is too long."});

        return
    }

    let id = (await dbClient.table('posts').insert({imageData: req.body.imageData, title: req.body.title}))[0];
    res.statusCode = 201;
    res.header('Location',`${req.baseUrl}/${id}` );
    res.send();
}
