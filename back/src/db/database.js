import mongoose from "mongoose";

const connectDataBase = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDataBase;
