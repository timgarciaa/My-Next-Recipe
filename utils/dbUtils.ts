import sql from "better-sqlite3";
import { Recipe } from "@/types/recipe.type";

const db = sql("recipes.db");

export function getRecipes() {
  const db = sql("recipes.db");
  const recipes = db
    .prepare(
      `
  SELECT * FROM recipes
  ORDER BY is_favorite DESC, title ASC
  `
    )
    .all();
  return recipes;
}

export function getRecipe(id: number) {
  const db = sql("recipes.db");
  const recipe = db.prepare("SELECT * FROM recipes WHERE id = ?").get(id);
  return recipe;
}

export function getIngredients() {
  const db = sql("recipes.db");
  const ingredients = db.prepare("SELECT * FROM ingredients").all();
  return ingredients;
}

export function getRecipeEngredients(id: number) {
  const db = sql("recipes.db");
  const recipesWithEngredients = db
    .prepare(
      `
      SELECT
        recipes.id AS recipe_id,
        ingredients.id AS ingredient_id,
        ingredients.name AS ingredient_name
      FROM
        recipes
      JOIN
        recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
      JOIN
        ingredients ON recipe_ingredients.ingredient_id = ingredients.id
      WHERE
        recipes.id = ?;
      `
    )
    .all(id);
  return recipesWithEngredients;
}

export function addRecipe(recipe: Recipe) {
  const db = sql("recipes.db");
  const addRecipe = db
    .prepare(
      `
      INSERT INTO recipes (
        title,
        cooking_instructions,
        is_vegetarian,
        is_favorite,
        serving_portions,
        image,
        creation_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `
    )
    .run(
      recipe.title,
      recipe.cooking_instructions,
      recipe.is_vegetarian,
      recipe.is_favorite,
      recipe.serving_portions,
      recipe.image,
      recipe.creation_date
    );
  return addRecipe;
}

export function updateRecipe(recipe: Recipe) {
  const db = sql("recipes.db");
  const updateRecipe = db
    .prepare(
      `
      UPDATE recipes SET
        title = ?,
        cooking_instructions = ?,
        is_vegetarian = ?,
        is_favorite = ?,
        serving_portions = ?,
        image = ?,
        creation_date = ?
      WHERE id = ?
      `
    )
    .run(
      recipe.title,
      recipe.cooking_instructions,
      recipe.is_vegetarian,
      recipe.is_favorite,
      recipe.serving_portions,
      recipe.image,
      recipe.creation_date,
      recipe.id
    );
  return updateRecipe;
}
