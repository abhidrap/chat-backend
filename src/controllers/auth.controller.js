import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
// signup 
export const signup = async (req,res) =>{
    console.log("inside signup function")
    const {fullname, email, password} = req.body;
    try{
        if(!fullname || !email || !password )
        {
            return res.status(400).json({message:"all fields are required"});
        }
        if (password.length<6){
            return res.status(400).json({message:"length must be 6 characters least"})
        }
        const user = await User.findOne({email})
 
        if(user) return res.status(400).json({message:"email already exists"});

        const salt = await bcrypt.genSalt(10); 

        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            fullname, 
            email,
            password:hashedPassword,
            profilePic: null,
        })

        if(newUser) {
            //generate jwt token 
             
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id:newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }
        else{
            res.status(400).json({message:"invalid user data"});
        }

    }
    catch(error) {
        console.error("error in signup",error)
        return res.status(500).json({message:error.message})
    }
}

// login 
export const login = async (req,res) =>{
    const {email, password} = req.body;
try{
    const user = await User.findOne({email});
    if(!user)
    {
        return res.status(400).json({message:"invalid credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect)
    {
        return res.status(400).json({message:"invalid credentials too"});
    }

    generateToken(user._id, res);
    res.status(200).json({
        _id:user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
    })
}
catch(error){
 console.log("error in login", error.message);
 res.status(500).json({message:"internal error"});
}
}  

// logout 
export const logout = (req,res) =>{
try{
 res.cookie("jwt","" , {maxAge :0});
 res.status(200).json({message:"logged out successfully"});
}
catch(error){
    console.log("error in logout controller", error.message);
    res.status(200).json({message:"internal server error error"});


}
}

//update profile
export const updateProfile = async (req,res) =>{
try{
    const {profilePic} = req.body;
    const userId =req.user._id;
    // console.log("checking", profilePic);
    if(!profilePic) {
        return res.status(400).json({message:"profile pic is required"});
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true});
    res.status(200).json(updatedUser);

}   
catch(error){
    console.log("error while profilePic uploading", error);
    return res.status(500).json({message:"internal error in server"});
} 
}

//check auth on reload
export const checkAuth = (req, res) =>{
    try{
        res.status(200).json(req.user);
    }
    catch(error)

    {
        console.log("error in checkAuth controller", error);
        res.status(500).json({message:"internal server error"}); 
    }
}