import express from 'express'
import cors from 'cors'
import router from "./router.js";

const app = express()
app.use(express.json()) // Setup JSON Body Parsing
app.use(cors()) // NOTE: This is insecure by default and must be updated later.

//Setup root router.
app.use(router())

export { app }