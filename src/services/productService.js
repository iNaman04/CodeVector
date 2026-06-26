import pool from "../db/db.js";

export const getAllProducts = async ({
    limit,
    category,
    cursorTime,
    cursorId
}) => {

    let query = `
        SELECT
            id,
            name,
            category,
            price,
            created_at,
            updated_at
        FROM products
    `;

    const conditions = [];
    const values = [];

    if (category) {

        values.push(category);

        conditions.push(
            `category = $${values.length}`
        );

    }

    if (cursorTime && cursorId) {

        values.push(cursorTime);
        const timeIndex = values.length;

        values.push(cursorId);
        const idIndex = values.length;

        conditions.push(`
            (
                updated_at < $${timeIndex}
                OR
                (
                    updated_at = $${timeIndex}
                    AND id < $${idIndex}
                )
            )
        `);

    }

    if (conditions.length > 0) {

        query += `
            WHERE
            ${conditions.join(" AND ")}
        `;

    }

    values.push(limit);

    query += `
        ORDER BY
            updated_at DESC,
            id DESC
        LIMIT $${values.length}
    `;

    const result = await pool.query(query, values);

    return result.rows;

};

export default getAllProducts;