import { getIngredients, addIngredient } from '@/utils/dbUtils'
import { NextRequest } from 'next/server';

export async function GET() {
      const ingredients = getIngredients();
      return Response.json(ingredients);
}

export async function POST(request: NextRequest) {
      const body = await request.json();
      const ingredient = addIngredient(body.name);
      return Response.json(ingredient);
}
