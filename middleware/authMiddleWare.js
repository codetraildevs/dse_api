import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    //Bearer token
    const token=authHeader && authHeader.split(' ')[1];//['Bearer' 'token']


    if(!token) return res.status(403).json({msg:'Token required'});
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err) return res.status(401).json({msg:'Invalid token'});
        req.user=user;
        next();
    });
}