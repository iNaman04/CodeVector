import pool from "../db/db.js";

export const getAllProducts = async (limit) => {

    const query = `
        SELECT
            id,
            name,
            category,
            price,
            created_at,
            updated_at
        FROM products
        ORDER BY updated_at DESC
        LIMIT $1;
    `;

    const result = await pool.query(query, [limit]);

    return result.rows;

};

export default getAllProducts;