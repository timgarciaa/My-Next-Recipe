import Image from "next/image";
import { getRecipe, getRecipeIngredients } from "@/utils/actionUtils";
import RecipeNav from "./recipeNav";

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const recipe = await getRecipe(slug);
  const recipeIngredients = await getRecipeIngredients(slug);

  const instructions = recipe.cooking_instructions.split("\n");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-4xl p-6 rounded shadow-md bg-[#5a453b] w-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
          <RecipeNav recipeId={recipe.id} />
        </div>

        <Image
          className="rounded-lg mb-4"
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={300}
        />
        <p className="mb-2">
          <strong>Vegetarian:</strong> {recipe.is_vegetarian}
        </p>
        <p className="mb-2 mt-5">
          <strong>Serving Portions:</strong> {recipe.serving_portions}
        </p>
        <p className="mb-2 mt-5">
          <strong>Ingredients:</strong>{" "}
        </p>
        <ul className="grid grid-cols-4 gap-4 border-2 rounded-md p-5">
          {recipeIngredients.map((ingredient: any) => {
            return (
              <li key={ingredient.ingredient_id}>
                {ingredient.ingredient_name.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <div className="mt-5">
          <strong>Cooking Instructions:</strong>
          <div className="border-2 rounded-md p-5 mt-2">
          {instructions.map((instruction: string, index: number) => (
            <p key={index} className="mb-2">
              {instruction}
            </p>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
