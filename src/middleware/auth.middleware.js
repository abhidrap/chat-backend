import jwt from  "jsonwebtoken";
import { User } from "../models/user.model.js";


export const protectRoute = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"unauthorized; no token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:"unauthorized, invalid token"});
        }
        const user = await User.findById(decoded.userId);
        console.log("in middleware", user);
        if(!user){
            return res.status(401).json({message:"unauthorized, invalid token"});
        }
        //when the user is authenticated then we add the user to the next function
        req.user= user 
        next();
    }
    catch(error){
        console.log("error in protectRoute middleware", error);
        return res.status(500).json({message:"internal server error"});

    }
};