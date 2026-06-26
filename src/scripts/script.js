import pool from "../db/db.js";
import { faker } from "@faker-js/faker";

const categories = [
    "Electronics",
    "Books",
    "Fashion",
    "Sports",
    "Furniture",
    "Beauty",
    "Groceries",
    "Toys"
];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

function generateProduct(index) {

    const createdAt = faker.date.past();

    return {
        name: `Product ${index}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: Number(faker.commerce.price({ min: 100, max: 5000 })),
        created_at: createdAt,
        updated_at: faker.date.between({
            from: createdAt,
            to: new Date()
        })
    };

}

async function seedProducts() {

    console.log("Seeding Started...");

    for (
        let start = 0;
        start < TOTAL_PRODUCTS;
        start += BATCH_SIZE
    ) {

        const products = [];

        for (
            let i = start;
            i < start + BATCH_SIZE &&
            i < TOTAL_PRODUCTS;
            i++
        ) {

            products.push(generateProduct(i + 1));

        }

        const placeholders = [];
        const values = [];

        products.forEach((product, index) => {

            const offset = index * 5;

            placeholders.push(
                `($${offset + 1},$${offset + 2},$${offset + 3},$${offset + 4},$${offset + 5})`
            );

            values.push(
                product.name,
                product.category,
                product.price,
                product.created_at,
                product.updated_at
            );

        });

        const query = `
            INSERT INTO products
            (name, category, price, created_at, updated_at)
            VALUES
            ${placeholders.join(",")}
        `;

        await pool.query(query, values);

        console.log(`${start + products.length} products inserted`);

    }

    console.log("Seeding Completed!");

    process.exit();

}

seedProducts().catch(console.error);