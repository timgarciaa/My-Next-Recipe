import { type NextRequest } from 'next/server'
import sql from "better-sqlite3";

const db = sql("recipes.db");

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];
  const recipe = db.prepare("SELECT * FROM recipes WHERE id = ?").get(id);
  return Response.json(recipe);
}
