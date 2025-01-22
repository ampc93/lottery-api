import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

export const connectDB = async () => {

    try {

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connect successfully.");

    } catch (error) {
        console.log("MongoDB connect error:", error.message);
        process.exit(1); // Finaliza la app si la conexion falla
    }

}