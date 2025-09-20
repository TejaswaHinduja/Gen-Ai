import express from 'express';
import cors from 'cors';
import connectdb from './db.js';
import {router }from "./routes/auth.js";
import detectionRouter from "./routes/detection.js";
import cookieparser from 'cookie-parser';
const app=express();

app.use(express.json());
app.use(cookieparser());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || "https://your-frontend-app.vercel.app"
        : "http://localhost:5173", 
    credentials:true,
}));

connectdb();

app.use("/api/auth",router);
app.use("/api/detection", detectionRouter);

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}

export default app;
