import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



app.get("/", (req, res) => {
  res.json({
    message: "Laundry Management API Running"
  });
});
app.use("/api/orders", orderRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});