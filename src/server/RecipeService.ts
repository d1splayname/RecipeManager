import pool from "./db";

const RecipeService = {
    getAllRecipes,
    TestDBConnection
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

async function TestDBConnection () {
    let connection;

    try {
        connection = await pool.getConnection();

        await connection.query("SELECT 1");
        return true;
    } catch(error) {
        console.log("DB error TestDBConnection", error)
        return false;
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
}

export default RecipeService;