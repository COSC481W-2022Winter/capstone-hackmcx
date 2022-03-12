import express from "express";
import { router as postsRouter } from "./v1/posts.router.js";
import { router as usersRouter } from "./v1/users.router.js";

export const router = new express.Router();

router.use("/posts", postsRouter)
router.use("/users", usersRouter)
