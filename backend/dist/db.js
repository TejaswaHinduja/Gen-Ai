import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export default async function connectdb() {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) {
        console.log("url not there");
        return;
    }
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connected to db");
    }
    catch (error) {
        console.error("Error connecting to db:", error);
        throw error;
    }
}
//# sourceMappingURL=db.js.map