import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./utils/db.js";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

configDotenv();
const app = express();

const corsOptions = {
    origin: 'https://storygrid-full-stack-project-frontend.onrender.com', // Updated to allow the frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
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
