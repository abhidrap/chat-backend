import  express from "express";
import dotenv from "dotenv";
import { connect_db } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser  from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));



const port = process.env.PORT;

app.use("/api/auth", authRoutes); 
app.use("/api/message", messageRoutes);

app.listen(port,()=>{
    console.log("server is running");
    connect_db();
})