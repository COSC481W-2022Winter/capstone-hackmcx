import express from "express";
import {getCaptions, postCaptions} from "../../../controllers/captions.controller.js";

export const router = new express.Router({mergeParams: true});

router.get('/', getCaptions)
router.post('/', postCaptions)