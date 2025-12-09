//creating express server
//change type to module in package.json
//  to use import export syntax
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';//importing cors middleware
import {db} from './config/db.js';
import authRoutes   from './routes/authRoutes.js';
import itemRoutes   from './routes/itemRoutes.js';
const app =express();
//evn file config
dotenv.config();
//middleware
app.use(cors());
app.use(express.json());
//Test db conncetion
db.getConnection((err)=>{
    if(err){
        console.log('Database connection failed',err);
    }
    else{
        console.log('Database connected successfully');
    }
});

//routes and endpoints
// app.get('/',(req,res)=>{
//     res.send("Welcome to DSE Backend API developed by DSE Team");

// })//
//endpoint:http://localhost:{{port number}}/api/auth/register
//auth routes
app.use('/api/auth',authRoutes);
//item routes
app.use('/api/items', itemRoutes);

//app listening port
const PORT= process.env.PORT || 3000; 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});