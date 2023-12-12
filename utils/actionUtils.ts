"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import { Recipe } from "@/types/recipe.type";
import fs from "node:fs";
import { redirect } from "next/navigation";
import { format } from 'date-fns';

export async function getRecipes() {
  const response = await fetch("http://localhost:3000/api/recipes", {
    next: { tags: ["recipes"] },
  });
  return await response.json();
}

export async function getIngredients() {
  const response = await fetch("http://localhost:3000/api/ingredients", {
    next: { tags: ["ingredients"] },
  });
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
    `http://localhost:3000/api/recipes/${id}/ingredients`,
    { next: { tags: ["ingredients"] } }
  );
  return await response.json();
}

export async function getRecipe(id: string) {
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    next: { tags: ["recipe", "ingredients"] },
  });
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
    creation_date: format(new Date(), 'dd-MM-yyyy HH:mm'),
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

export async function deleteIngredient(id: string) {
  await fetch(`http://localhost:3000/api/ingredients/${id}`, {
    method: "DELETE",
  });
  revalidateTag("ingredients");
  redirect("/ingredients");
}

export async function createIngredient(formData: FormData) {
  const name = formData.get("name");
  const ingredient = { name: name ? name.toString() : "" };

  await fetch("http://localhost:3000/api/ingredients", {
    method: "POST",
    body: JSON.stringify(ingredient),
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag("ingredients");
  redirect("/ingredients");
}

export async function updateIngredient(formData: FormData) {
  console.log('update ingredient', formData);
  const name = formData.get("name");
  const id = formData.get("id");

  const ingredient = { name: name ? name.toString() : "" };

  await fetch(`http://localhost:3000/api/ingredients/${id}`, {
    method: "PUT",
    body: JSON.stringify(ingredient),
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag("ingredients");
  redirect("/ingredients");
}

export async function getIngredient(id: string) {
  const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
    next: { tags: ["ingredients"] },
  });
  return await response.json();
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
    const extension =
      image instanceof File ? image.name.split(".").pop() : null;
    const datetimestamp = new Date().getTime();
    fileName = `/images/${title}${datetimestamp}.${extension}`;

    const stream = fs.createWriteStream(`public${fileName}`);
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
  } else {
    fileName = formData.get("currentImage") as string;
  }

  const recipe: Recipe = {
    id: Number(formData.get("id")),
    title: title ? title.toString() : "",
    cooking_instructions: cooking_instructions
      ? cooking_instructions.toString()
      : "",
    is_vegetarian: is_vegetarian?.toString() === "true" ? "true" : "false",
    is_favorite: is_favorite?.toString() === "true" ? "true" : "false",
    serving_portions: serving_portions ? Number(serving_portions) : 0,
    image: `${fileName}`,
  };

  await fetch("http://localhost:3000/api/recipes", {
    method: "PUT",
    body: JSON.stringify(recipe),
    headers: { "Content-Type": "application/json" },
  });

  const ingredientsArray = ingredients
    ? String(ingredients).split(",").map(Number)
    : [];

  await fetch(`http://localhost:3000/api/recipes/${recipe.id}/ingredients`, {
    method: "PUT",
    body: JSON.stringify({
      recipeId: recipe.id,
      ingredientIds: ingredientsArray,
    }),
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag("recipes");
  revalidateTag("recipe");
  redirect(`/recipe/${recipe.id}`);
}
