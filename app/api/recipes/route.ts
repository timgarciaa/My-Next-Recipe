import sql from 'better-sqlite3';

const db =sql('recipes.db');

export async function GET() {
      const recipes = db.prepare('SELECT * FROM recipes').all();
      return Response.json(recipes);
}