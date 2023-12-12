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
  const ingredients = db.prepare("SELECT * FROM ingredients ORDER BY name ASC").all();
  return ingredients;
}

export function getRecipeIngredients(id: number) {
  const db = sql("recipes.db");
  const recipesWithIngredients = db
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
  return recipesWithIngredients;
}

export function addRecipeIngredients(
  recipe_id: number,
  ingredientIds: number[]
) {
  const db = sql("recipes.db");

  const addRecipeIngredient = db.prepare(
    `
    INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
    VALUES (?, ?)
    `
  );

  for (const ingredientId of ingredientIds) {
    addRecipeIngredient.run(recipe_id, ingredientId);
  }

  return {
    message: "Ingredients added successfully",
    recipe_id,
    ingredientIds,
  };
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
        image = ?
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
      recipe.id
    );
  return updateRecipe;
}

export function updateRecipeIngredients(
  recipe_id: number,
  ingredientIds: number[]
) {
  const db = sql("recipes.db");

  const deleteRecipeIngredient = db.prepare(
    `
    DELETE FROM recipe_ingredients
    WHERE recipe_id = ?
    `
  );

  deleteRecipeIngredient.run(recipe_id);

  const addRecipeIngredient = db.prepare(
    `
    INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
    VALUES (?, ?)
    `
  );

  for (const ingredientId of ingredientIds) {
    addRecipeIngredient.run(recipe_id, ingredientId);
  }

  return {
    message: "Ingredients updated successfully",
    recipe_id,
    ingredientIds,
  };
}

export function deleteRecipe(id: number) {
  const db = sql("recipes.db");
  const deleteRecipe = db.prepare("DELETE FROM recipes WHERE id = ?").run(id);
  return deleteRecipe;
}

export function deleteRecipeIngredients(id: number) {
  const db = sql("recipes.db");
  const deleteRecipeIngredients = db
    .prepare("DELETE FROM recipe_ingredients WHERE recipe_id = ?")
    .run(id);
  return deleteRecipeIngredients;
}

export function deleteIngredient(id: number) {
  const db = sql("recipes.db");
  const deleteRecipeIngredients = db
    .prepare("DELETE FROM recipe_ingredients WHERE ingredient_id = ?")
    .run(id);
  const deleteIngredient = db
    .prepare("DELETE FROM ingredients WHERE id = ?")
    .run(id);
  return deleteIngredient;
}

export function addIngredient(name: string) {
  const db = sql("recipes.db");
  const addIngredient = db
    .prepare("INSERT INTO ingredients (name) VALUES (?)")
    .run(name);
  return addIngredient;
}

export function updateIngredient(id: number, name: string) {
  const db = sql("recipes.db");
  const updateIngredient = db
    .prepare("UPDATE ingredients SET name = ? WHERE id = ?")
    .run(name, id);
  return updateIngredient;
}

export function getIngredient(id: number) {
  const db = sql("recipes.db");
  const ingredient = db
    .prepare("SELECT * FROM ingredients WHERE id = ?")
    .get(id);
  return ingredient;
}
