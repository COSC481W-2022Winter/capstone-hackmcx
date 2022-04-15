import express from "express";
import {
    getUsers,
    getUsersByUserId,
    postUser,
    updateUsersByUserId,
    postLogin,
    updatePassword
} from "../../controllers/users.controller.js";
import {authenticateToken} from "../../middleware/auth.middleware.js";

export const router = new express.Router();

router.get('/', getUsers)
router.post('/', postUser)
router.post('/_updatePassword',authenticateToken, updatePassword)
router.post("/_login", postLogin)
router.get('/:userId', getUsersByUserId)
router.put('/:userId', authenticateToken, updateUsersByUserId) 
