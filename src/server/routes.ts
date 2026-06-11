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

export default router;