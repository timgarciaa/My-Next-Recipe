import Image from "next/image";
import {
  getRecipe,
  getRecipeIngredients,
} from "@/utils/actionUtils";
import RecipeNav from "./recipeNav";

export default async function Recipe({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const recipe = await getRecipe(slug);
  const recipeIngredients = await getRecipeIngredients(slug);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
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
        <p className="mb-2">
          <strong>Serving Portions:</strong> {recipe.serving_portions}
        </p>
        <p className="mb-2">
          <strong>Ingredients:</strong>{" "}
        </p>
        <ul>
          {recipeIngredients.map((ingredient: any) => {
            return (
              <li key={ingredient.ingredient_id}>
                {ingredient.ingredient_name}
              </li>
            );
          })}
        </ul>
        <p className="mb-2">
          <strong>Cooking Instructions:</strong> {recipe.cooking_instructions}
        </p>
      </div>
    </div>
  );
}
