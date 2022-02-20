import express from 'express';
import {router as v1Router} from './routers/v1.router.js'

export default function router(){
    let root = express.Router()

    root.use('/v1', v1Router)

    return root
}