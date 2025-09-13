import gentoken from "../jwt.js";
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import type {Request,Response,NextFunction} from "express";



const protect=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const tokenis=req.cookies.jwt;
        if(!tokenis){
            return res.status(400).json({message:"not authorized"});
        }
        const decoded=jwt.verify(tokenis,process.env.JWT_SECRET!) as {id:String};
        if(!decoded){
            return res.status(400).json({message:"not authorized"});
        };
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({message:"user not found ,please sign up"})
        }
        next();
    }
    catch(error){
        console.log(error,"authmid error");
        throw error;
        return res.status(500).json({message:"Server error"});
    }
}