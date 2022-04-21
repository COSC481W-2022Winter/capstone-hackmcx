import express from 'express'
import cors from 'cors'
import router from "./router.js"

const app = express()
app.use(express.json({limit: '2mb'})) // Setup JSON Body Parsing
app.use(cors()) // NOTE: This is insecure by default and must be updated later.

//Setup root router.
app.use('/api', router())

export { app }