import mongoose from "mongoose";

export const connect_db = async () =>{
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB connected ${connection.connection.host}`);
    }
    catch(error){
        console.log("mongoDB connection error", error);
    }
};