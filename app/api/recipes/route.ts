import { type NextRequest } from "next/server";
import { getRecipes, updateRecipe, addRecipe } from "@/utils/dbUtils";
import { Recipe } from "@/types/recipe.type";

export async function GET() {
  const recipes = getRecipes();
  return Response.json(recipes);
}

export async function POST(request: NextRequest) {
  const recipe: Recipe = await request.json();
  const result = addRecipe(recipe);
  return Response.json(result);
}

export async function PUT(request: NextRequest) {
  const recipe: Recipe = await request.json();
  const result = updateRecipe(recipe);
  return Response.json(result);
}
