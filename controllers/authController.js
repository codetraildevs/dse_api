import  { db } from '../config/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
//test connection
//register

export const register= async (req,res)=>{
    const {name,email,password}=req.body;
//Add more validation

//hash password

const hash=bcrypt.hashSync(password,10);


// query for  create new user
db.query("INSERT INTO users (name,email,password) Values (?,?,?)",[name,email,hash],(err)=>{
    if(err) return res.json({err:`Failed to create an account ${err}`});

    return res.json({message:"User created Successfully"});
});
};
//login
export const login =(req,res)=>{
const {email,password}=req.body;
//check if user exist in database

db.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{
    if(err) return res.json({err:`Error occur ${err}`});
    if(result.length===0) return res.json({message:'User not found'});
    //compare password of user with one db

    bcrypt.compare(password,result[0].password,(err,match)=>{
        if(!match) return res.json({message:'Incorrect password'})
    });
//create  token
const token=jwt.sign({id:result[0].id,email:result[0].email},
    process.env.JWT_SECRET_KEY,
    {expiresIn:process.env.JWT_EXPIRES_IN});
res.json({message:"login successfully",token});
});

}