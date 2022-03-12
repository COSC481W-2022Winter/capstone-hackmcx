import express from "express";
import {router as captionsRouter} from "./posts/captions.router.js"
import {getPostById, getPosts, postPost} from "../../controllers/posts.controller.js";

export const router = new express.Router();

router.get('/', getPosts)
router.post('/', postPost)

router.get('/:postId', getPostById)

router.use('/:postId/captions', captionsRouter)
