import  {getAllProducts}  from "../services/productService.js";

export const getProducts = async (req, res) => {
    try {

        let limit = parseInt(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            limit = 20;
        }

        if (limit > 100) {
            limit = 100;
        }

        const category = req.query.category;

        const cursorTime = req.query.cursorTime || null;
        const cursorId = req.query.cursorId
            ? Number(req.query.cursorId)
            : null;

        const products = await getAllProducts({
            limit,
            category,
            cursorTime,
            cursorId
        });

        let nextCursor = null;

        if (products.length > 0) {

            const last = products[products.length - 1];

            nextCursor = {
                cursorTime: last.updated_at,
                cursorId: last.id
            };

        }

        res.status(200).json({
            success: true,
            count: products.length,
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