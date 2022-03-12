import express from "express";
import {getUsers, getUsersByUserId, postUser} from "../../controllers/users.controller.js";

export const router = new express.Router();

router.get('/', getUsers)
router.post('/', postUser)

router.get('/:userId', getUsersByUserId)

