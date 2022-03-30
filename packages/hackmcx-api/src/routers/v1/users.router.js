import express from "express";
import {getUsers, getUsersByUserId, postUser, updateUsersByUserId, postLogin} from "../../controllers/users.controller.js";

export const router = new express.Router();

router.get('/', getUsers)
router.post('/', postUser)
router.post("/_login", postLogin)
router.get('/:userId', getUsersByUserId)
router.put('/:userId', updateUsersByUserId)

