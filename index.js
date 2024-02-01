import express  from "express";
const app = express();
import dotenv from "dotenv";
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connectrd to mOngoDb')
      } catch (error) {
        throw error;
      }
};
mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb disconnected")
});
mongoose.connection.on("connected",()=>{
    console.log("mongoDb connected")
})
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use('/api/auth',authRoute);
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute);


app.listen(8800,()=>{
    connect()
    console.log('api work')
})