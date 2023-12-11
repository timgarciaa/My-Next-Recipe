import { type NextRequest } from 'next/server'
import { getRecipeIngredients, addRecipeIngredients, updateRecipeIngredients } from '@/utils/dbUtils';

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const recipeIngredients = getRecipeIngredients(id);
  return Response.json(recipeIngredients);
}


export async function POST(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const requestBody = await request.json();
  const ingredientsId = requestBody.ingredientIds;
  const recipeIngredients = addRecipeIngredients(id, ingredientsId);
  return Response.json(recipeIngredients);
}

export async function PUT(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const requestBody = await request.json();
  const ingredientsId = requestBody.ingredientIds;
  const recipeIngredients = updateRecipeIngredients(id, ingredientsId);
  return Response.json(recipeIngredients);
}