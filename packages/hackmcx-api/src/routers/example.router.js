import express from "express";
import {getExample} from "../controllers/example.controller.js";

export const router = new express.Router();
router.get('/example', getExample)