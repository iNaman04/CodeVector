import express from "express";
import getAllProducts from "../services/productService.js";

const getProducts = async(req, res) =>{
    try {
        const products = await getAllProducts();

        res.status(200).json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export default getProducts;