import express from "express";
import { router as postsRouter } from "./v1/posts.router.js";

export const router = new express.Router();

router.use("/posts", postsRouter)