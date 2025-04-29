import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/mongoDbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import CustomError from "./utils/customErrorClass.js";
import globalErrorHandler from "./controllers/errorController.js";

dotenv.config();

const app = express();

app.use(express.json());


app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  const err = new CustomError(
    404,
    `Cant find the url ${req.originalUrl} on the server`
  );
  next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server started");
});
