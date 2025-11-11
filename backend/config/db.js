import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1); // ❗ Exit the app if connection fails
  }
};

export default connectDB;
