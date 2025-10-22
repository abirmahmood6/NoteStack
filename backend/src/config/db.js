import mongoose from "mongoose"; // the bridge between database and backend server

export const connectDB = async () => { //async as we will have some promises
  try {
    await mongoose.connect(process.env.MONGO_URI); // .connect() is the PROMISE
     console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error)
    process.exit(1); // "1" means exit with failure ,   if we give "0", it means success
  }
};
