import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectToDatabase;
