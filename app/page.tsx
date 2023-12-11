import Card from "@/components/card";
import { Recipe } from "@/types/recipe.type";
import { getRecipes } from "@/utils/actionUtils";
import Link from "next/link";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-between w-full px-20 pb-20">
        <h1 className="text-4xl font-bold mb-4">Recipes</h1>
        <Link className="bg-[#743f22] text-white px-4 py-4 rounded-lg" href="/recipe/form">
          Add Recipe
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {recipes.map((recipe: Recipe) => {
          return <Card key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </main>
  );
}
