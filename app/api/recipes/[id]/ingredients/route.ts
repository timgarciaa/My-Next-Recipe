import { type NextRequest } from 'next/server'
import { getRecipeEngredients } from '@/utils/dbUtils';

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const recipeEngredients = getRecipeEngredients(id);
  return Response.json(recipeEngredients);
}
