import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js'

dotenv.config()

const PROT = process.env.PROT || 5000
const CONNECT_DB_URL = process.env.CONNECT_DB_URL

const app = express()



app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors(
    {
        origin: "http://localhost:3000"
    }
));

app.use('/posts', postRoutes)

mongoose.connect(CONNECT_DB_URL)
.then(()=> app.listen(PROT, console.log(`listening on port ${PROT}`)))
.catch((error)=> console.error(error.message))



