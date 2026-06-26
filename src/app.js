import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

export default app; 