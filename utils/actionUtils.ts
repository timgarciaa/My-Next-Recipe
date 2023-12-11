"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import { Recipe } from "@/types/recipe.type";
import fs from "node:fs";
import { redirect } from "next/navigation";

export async function getRecipes() {
  const response = await fetch("http://localhost:3000/api/recipes");
  return await response.json();
}

export async function getIngredients() {
  const response = await fetch("http://localhost:3000/api/ingredients");
  return await response.json();
}

export async function updateFavorite(recipe: Recipe) {
  await fetch("http://localhost:3000/api/recipes", {
    method: "PUT",
    body: JSON.stringify(recipe),
    headers: { "Content-Type": "application/json" },
  });
  revalidateTag("recipes");
}

export async function getRecipeIngredients(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/recipes/${id}/ingredients`
  );
  return await response.json();
}

export async function getRecipe(id: string) {
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
  return await response.json();
}

export async function addRecipe(formData: FormData) {
  const title = formData.get("title");
  const cooking_instructions = formData.get("cooking_instructions");
  const is_vegetarian = formData.get("is_vegetarian");
  const is_favorite = formData.get("is_favorite");
  const serving_portions = formData.get("serving_portions");
  const image = formData.get("image");
  const ingredients = formData.getAll("ingredients");

  const extension = image instanceof File ? image.name.split(".").pop() : null;
  const fileName = `${title}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await (image instanceof File
    ? image.arrayBuffer()
    : null);

  if (bufferedImage) {
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Saving image failed");
      }
    });
  }

  const recipe: Recipe = {
    title: title ? title.toString() : "",
    cooking_instructions: cooking_instructions
      ? cooking_instructions.toString()
      : "",
    is_vegetarian: is_vegetarian ? "true" : "false",
    is_favorite: is_favorite ? "true" : "false",
    serving_portions: serving_portions ? Number(serving_portions) : 0,
    image: `/images/${fileName}`,
    creation_date: new Date().toISOString(),
  };

  const createdRecipe = await fetch("http://localhost:3000/api/recipes", {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: { "Content-Type": "application/json" },
  });

  const createdRecipeJson = await createdRecipe.json();

  const result = await fetch(
    `http://localhost:3000/api/recipes/${createdRecipeJson.lastInsertRowid}/ingredients`,
    {
      method: "POST",
      body: JSON.stringify({ ingredientIds: ingredients }),
      headers: { "Content-Type": "application/json" },
    }
  );

  await result.json();

  revalidatePath("/");
  revalidateTag("recipes");
  redirect("/");
}

export async function deleteRecipe(id: string) {
  await fetch(`http://localhost:3000/api/recipes/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/");
  revalidateTag("recipes");
  redirect("/");
}

export async function updateRecipe(formData: FormData) {
  const title = formData.get("title");
  const cooking_instructions = formData.get("cooking_instructions");
  const is_vegetarian = formData.get("is_vegetarian");
  const is_favorite = formData.get("is_favorite");
  const serving_portions = formData.get("serving_portions");
  const image = formData.get("image");
  const ingredients = formData.get("ingredients");

  let fileName = "";
  if (image) {
    console.log('image is not empty');
    const extension =
      image instanceof File ? image.name.split(".").pop() : null;
    const fileName = `/images/${title}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await (image instanceof File
      ? image.arrayBuffer()
      : null);

    if (bufferedImage) {
      stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
          throw new Error("Saving image failed");
        }
      });
    }
  }
  else {
    fileName = formData.get("currentImage") as string;
  }

  console.log('fileName: ', fileName);

  const recipe: Recipe = {
    id: Number(formData.get("id")),
    title: title ? title.toString() : "",
    cooking_instructions: cooking_instructions
      ? cooking_instructions.toString()
      : "",
    is_vegetarian: is_vegetarian ? "true" : "false",
    is_favorite: is_favorite ? "true" : "false",
    serving_portions: serving_portions ? Number(serving_portions) : 0,
    image: `${fileName}`,
  };

  console.log('recipe: ', recipe);

  await fetch("http://localhost:3000/api/recipes", {
    method: "PUT",
    body: JSON.stringify(recipe),
    headers: { "Content-Type": "application/json" },
  });

  const ingredientsArray = ingredients ? String(ingredients).split(',').map(Number) : [];

  console.log('recipe.id: ', recipe.id);
  console.log('ingredients: ', ingredientsArray);

  await fetch(`http://localhost:3000/api/recipes/${recipe.id}/ingredients`, {
    method: "PUT",
    body: JSON.stringify({ recipeId: recipe.id, ingredientIds: ingredientsArray }),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/");
  revalidatePath(`/recipe/${recipe.id}`);
  revalidateTag("recipes");
  redirect(`/recipe/${recipe.id}`);
}
