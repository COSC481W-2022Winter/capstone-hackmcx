import express from "express";
import {getPostById, getPosts, postPost} from "../../controllers/posts.controller.js";

export const router = new express.Router();

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', postPost)