import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { connectDB } from "./dabase/db.js";

import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/CartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2500;

// middleware
app.use(cors());
app.use(express.json());

// db
connectDB();

// routes
app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);

// static images
app.use("/images", express.static("uploads"));

// test route
app.get("/", (req, res) => {
  res.send("FoodHub Backend Running ");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});