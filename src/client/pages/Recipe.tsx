import * as React from 'react';

interface Recipe {
  id: number;
  name: string;
  url: string;
  dateCreated: string;
  rating: number;
}

interface RecipeProps {
  recipe: Recipe;
}

const Recipe = ({recipe}: RecipeProps) => (
  <main className="container my-5 app-shell">
    <div className="hero-card mb-4 shadow-sm">
      <h1>Recipe Page</h1>
      <p>This is the recipe page content.</p>
      <h2>{recipe.name}</h2>
      <a href={recipe.url}>Go to recipe</a>
      <p>{recipe.dateCreated}</p>
      <p>recipe.lastMade</p>
    </div>
  </main>
);

export default Recipe;