import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
    console.log(`Connecting to MongoDB...`)
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Database connection established!`)
    })
    .catch((error) => console.log(`Error in connection, ${error}`));
};

export default connectDB;
