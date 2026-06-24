import pool from "./db";

const RecipeService = {
    getAllRecipes,
    TestDBConnection,
    SaveRecipe
};

async function getAllRecipes() {
    const command = `
        SELECT id, name, url, dateCreated
            FROM simpleRecipes;
    `;
    
    return QueryDatabase(command);
}

async function TestDBConnection () {
    const command = `
        SELECT 1
    `;
    
    return QueryDatabase(command);
}

async function SaveRecipe(Name: string, URL: string) {
    const command=`
        INSERT INTO simpleRecipes (name, url)
        VALUES(?, ?)
    `;

    const params: string[] = [Name, URL];

    return await QueryDatabase(command, params);
}

async function QueryDatabase(command: string, params: any[] = []) {
    let connection;

    try {
        connection = await pool.getConnection();

        const result = await connection.query(command, params);
        return result;
    } catch (error) {
        console.error("DB error: ", error);

        throw new Error("DB query failed");
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export default RecipeService;