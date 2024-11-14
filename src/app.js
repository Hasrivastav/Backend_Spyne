import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./db/index.js"; 
import userRouter from "./routes/user.routes.js"; 
import cors from "cors"; 
import carRouter from "./routes/car.routes.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/car", carRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
