import express from "express";
import getAllProducts from "../services/productService.js";

const getProducts = async(req, res) =>{
    try {
        
        const limit = parseInt(req.query.limit) || 2;
        
        const products = await getAllProducts(limit);

        res.status(200).json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export default getProducts;