import { getAllProducts } from "../services/productService.js";

export const getProducts = async (req, res) => {
    try {

        // Limit
        let limit = parseInt(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            limit = 20;
        }

        if (limit > 100) {
            limit = 100;
        }

        // Optional category filter
        const category = req.query.category || null;

        // Cursor
        const cursorTime = req.query.cursorTime || null;

        const cursorId = req.query.cursorId
            ? Number(req.query.cursorId)
            : null;

        // Snapshot time
        const anchorTime =
            req.query.anchorTime || new Date().toISOString();

        const products = await getAllProducts({
            limit,
            category,
            cursorTime,
            cursorId,
            anchorTime
        });

        let nextCursor = null;

        if (products.length > 0) {
            const lastProduct = products[products.length - 1];

            nextCursor = {
                cursorTime: lastProduct.updated_at,
                cursorId: lastProduct.id
            };
        }

        res.status(200).json({
            success: true,
            count: products.length,
            anchorTime,
            nextCursor,
            data: products
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

export default getProducts;