"use server";
import { revalidateTag } from "next/cache";
import { Recipe } from "@/types/recipe.type";
import fs from "node:fs";
import path from 'path';

export async function getRecipes() {
  const response = await fetch("http://localhost:3000/api/recipes");
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

export async function addRecipe(formData: FormData) {
  const title = formData.get("title");
  const cooking_instructions = formData.get("cooking_instructions");
  const is_vegetarian = formData.get("is_vegetarian");
  const is_favorite = formData.get("is_favorite");
  const serving_portions = formData.get("serving_portions");
  const image = formData.get("image");

  const extension = image instanceof File ? image.name.split(".").pop() : null;
  const fileName = `${title}.${extension}`;

  console.log("fileName", fileName);

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await (image instanceof File ? image.arrayBuffer() : null);

  if (bufferedImage) {
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error('Saving image failed');
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
  console.log(recipe);

  await fetch("http://localhost:3000/api/recipes", {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: { "Content-Type": "application/json" },
  });
  revalidateTag("recipes");
}