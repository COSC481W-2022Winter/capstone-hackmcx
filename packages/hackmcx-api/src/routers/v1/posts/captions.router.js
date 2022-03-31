import express from "express";
import {getCaptions, postCaptions, rateCaption} from "../../../controllers/captions.controller.js";
import {authenticateToken} from "../../../middleware/auth.middleware.js";

export const router = new express.Router({mergeParams: true});

router.get('/', getCaptions)
router.post('/', authenticateToken, postCaptions)
router.post("/:captionId/_rate", authenticateToken, rateCaption)
