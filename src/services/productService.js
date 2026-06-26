import pool from "../db/db.js";

const getAllProducts = async () => {
    const result = await pool.query(`
        SELECT NOW();
    `);

    return result.rows;
};

export default getAllProducts;