import express from "express";
import {getCaptions, postCaptions} from "../../controllers/captions.controller.js";

export const router = new express.Router();

router.get('/:id/captions', getCaptions)
router.post('/:id/captions', postCaptions)

//router.post('/', postPost)