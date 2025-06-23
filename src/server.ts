import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db-connect";
import authRoutes from "./routers/auth.routes";

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI ?? "";
console.log(PORT);
const app = express();

connectDB(DB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("object");
  res.status(200).json({
    message: "Hello, World!",
  });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
