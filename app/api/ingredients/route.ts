import { getIngredients } from '@/utils/dbUtils'

export async function GET() {
      const ingredients = getIngredients();
      return Response.json(ingredients);
}