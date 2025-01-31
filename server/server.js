import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./utils/db.js";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

configDotenv();
const app = express();

const corsOptions = {
    origin: 'https://storygrid.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
connectDB();
