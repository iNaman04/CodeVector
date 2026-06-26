import express from "express";

import productsRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running. Use /products to access the API.");
});

app.use("/products", productsRoutes);

export default app;