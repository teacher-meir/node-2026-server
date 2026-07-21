import { connect } from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    try {
        await connect(env.MONGO_URL);
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
        exit(1);// סגירת השרת עם סטטוס של שגיאה
    }
};
