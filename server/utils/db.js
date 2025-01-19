import { connect } from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected ...");
    } catch (error) {
        console.log("Error in connecting the DB: ", error);
    }
}

export default connectDB