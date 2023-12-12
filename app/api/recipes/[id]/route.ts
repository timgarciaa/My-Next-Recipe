import { type NextRequest } from "next/server";
import { getRecipe, deleteRecipe, deleteRecipeIngredients } from "@/utils/dbUtils";

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const recipes = getRecipe(id);
  return Response.json(recipes);
}

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const result2 = deleteRecipeIngredients(id);
  const result = deleteRecipe(id);
  return Response.json(result);
}