const mongoose = require('mongoose');
import { MONGODB_URL } from "./env";

export const connectDB = async () => {
    try {
       await mongoose(`${MONGODB_URL}`);
    } catch (error) {
       console.log("Error in Connecting MongoDB ", error);
    }
 };