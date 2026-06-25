import * as express from 'express';

import RecipeService from './RecipeService';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get("/api/dbTest", async (req, res, next) => {
    const isAvailable: boolean = await RecipeService.TestDBConnection();

    res.json(isAvailable);
});

router.get('/api/getAllRecipes', async(req, res, next) => {
    const data = await RecipeService.getAllRecipes();
    
    res.json(data)
});

router.post('/api/saveRecipe', async(req, res, next) => {
    const inputData = req.body;

    const name = inputData["name"];
    const url = inputData["url"];
    
    const result = await RecipeService.SaveRecipe(name as string, url as string);

    res.json({
        ...result,
        // big int cannot be parsed, so need to cast
        insertId: Number(result.insertId)
    });
});

router.post('/api/deleteRecipe', async(req, res, next) => {
    const input = req.body;

    const recipeID = input["id"];

    const result = await RecipeService.DeleteRecipe(recipeID);

    res.json({
        ...result,
        insertId: Number(result.insertId)
    });
});

export default router;