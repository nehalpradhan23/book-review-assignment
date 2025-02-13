import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

// app config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// initialize middlewares
app.use(express.json()); // parse requests using json methods
app.use(cors()); // connect client to backend server

app.use("/api", authRoutes);
// app.use("/api", validate, authRoutes);

// API routes
app.get("/", (req, res) => res.send("API working"));

app.listen(PORT, () => console.log("Server running on port " + PORT));
