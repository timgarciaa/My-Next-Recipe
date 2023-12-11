import { type NextRequest } from "next/server";
import { getRecipe } from "@/utils/dbUtils";

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/")[3]);
  const recipes = getRecipe(id);
  return Response.json(recipes);
}
