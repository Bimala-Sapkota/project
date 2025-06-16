import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db-connect";
import authRoutes from "./routers/auth.routes";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI ?? "";

connectDB(DB_URI);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
  });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
