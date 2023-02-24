// const express = require("express");
// const dotenv = require('dotenv');
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes/bugs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middleware
// invoke next function once done
// This logs incomming requests into the terminal
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Get request
app.get("/", (req: Request, res: Response) => {
    res.json({msg: "Welcome to App"});
});

app.use('/api/bugs', router);

if (process.env.MONGO_URI != undefined) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => { 
            app.listen(port, () => {
                console.log(`[server]: Listening on port ${port}!`);
            });
        })
        .catch((error) => console.error(error));
} else {
    console.error("No Mongo connection string in env");
}