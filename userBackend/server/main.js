import express from "express";
const app = express();
const port = 2000;
import cors from 'cors';
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // URL-ga frontend-kaaga
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Ku darnay headers-ka la oggol yahay
    credentials: true,
};
  
app.use(cors(corsOptions));

import userRoute from '../routes/userRoute.js'
app.use("/api/users" , userRoute)

import authorRoute from '../routes/authorRoute.js';
app.use("/api/authors", authorRoute);

import booksRoute from "../routes/booksRoute.js";
app.use("/api/books/",booksRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});