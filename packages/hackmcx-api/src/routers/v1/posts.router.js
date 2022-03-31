import express from "express";
import {router as captionsRouter} from "./posts/captions.router.js"
import {getPostById, getPosts, postPost} from "../../controllers/posts.controller.js";
import {authenticateToken} from "../../middleware/auth.middleware.js";

export const router = new express.Router();

router.get('/', getPosts)
router.post('/', authenticateToken, postPost)

router.get('/:postId', getPostById)

router.use('/:postId/captions', captionsRouter)
