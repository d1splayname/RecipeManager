import pool from "./db";

const RecipeService = {
    getAllRecipes
};

async function getAllRecipes() {
    let connection;

    try {
        connection = await pool.getConnection();

        const rows = await connection.query(`
            SELECT *
            FROM simpleRecipes;
        `);
        return rows;
    } catch (error) {
        console.error("DB error in getAllRecipes", error);

        throw new Error("Failed to fetch recipes from database");
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export default RecipeService;