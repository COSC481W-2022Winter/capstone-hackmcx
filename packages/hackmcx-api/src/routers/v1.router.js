import express from "express";
import { router as postsRouter } from "./v1/posts.router.js";
import { router as captionsRouter } from "./v1/captions.router.js";

export const router = new express.Router();

router.use("/posts", postsRouter)

router.use("/posts", captionsRouter)