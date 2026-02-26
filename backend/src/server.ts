import express, { Application } from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './router/user.routes';
import authRouter from './router/auth.routes';
import propertyRouter from './router/property.routes';
dotenv.config();

const app: Application = express();

const corsOperation = {
  origin:process.env.API_URL,
  credentials: true ,
};

app.use(cookieParser())

app.use(cors(corsOperation));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/property',propertyRouter);
const PORT = process.env.PORT;
connectDB();
app.listen(PORT, () => {
  console.log("service running", PORT);
});
