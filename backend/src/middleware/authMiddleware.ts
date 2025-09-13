import gentoken from "../jwt";
import User from "../models/user"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {Request,Response,NextFunction} from "express";



const protect=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const tokenis=req.cookies.jwt;
        if(!tokenis){
            return res.status(400).json({message:"not authorized"});
        }
        const decoded=jwt.verify(tokenis,process.env.JWT_SECRET!);
        if(!decoded){
            return res.status(400).json({message:"not authorized"});
        };

    }
    catch(error){
        console.log(error,"authmid error");
        throw error;
    }
}