import express from 'express';
import {router as exampleRouter} from './routers/example.router.js'

export default function router(){
    let root = express.Router()

    root.use(exampleRouter)

    return root
}