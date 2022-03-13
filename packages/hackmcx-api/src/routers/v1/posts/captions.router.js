import express from "express";
import {getCaptions, postCaptions, rateCaption} from "../../../controllers/captions.controller.js";

export const router = new express.Router({mergeParams: true});

router.get('/', getCaptions)
router.post('/', postCaptions)
router.post("/:captionId/_rate", rateCaption)