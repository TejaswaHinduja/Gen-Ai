import express from 'express';
import {Router} from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';

const router=Router();
router.post('/signup',async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return (
            res.status(400).json({message:"Fill all the fields"})
        )
    }
    const existingUser= await User.findOne({
        username
    })
    const newUser=new User({
        name:username,
        password
    })
    if(newUser){
        await newUser.save();
        console.log("User saved to db");
        res.status(201).json({message:"User created successfully"})
    }
});
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"Fill all the fields"});
    }
    const checkUser=await User.findOne({username});
    if(!checkUser){
        return res.status(400).json({message:"User not found"});}
    
    if(checkUser.password!==password){
        return res.status(400).json({message:"Invalid credentials"});
    }
    res.status(200).json({message:"Login successful"});
});
