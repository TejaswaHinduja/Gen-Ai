import express from 'express';
import cors from 'cors';
import connectdb from '../db';
import

const app=express();
app.use(cors());
app.use(express.json());
connectdb();
