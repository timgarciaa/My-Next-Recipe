import { getIngredientsAction } from "@/utils/actionUtils";
import Ingredient from "./ingredient";
import Link from "next/link";

export default async function IngredientsPage() {
  const ingredients = await getIngredientsAction();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-between w-full px-20 pb-20">
        <h1 className="text-4xl font-bold mb-4">Ingredients</h1>
        <Link
          className="bg-[#743f22] text-white px-4 py-4 rounded-lg"
          href="/ingredients/form"
        >
          Add Ingredient
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 text-[#743f22]">
        {ingredients.map((ingredient: any, index: number) => {
          return <Ingredient key={index} ingredient={ingredient} />;
        })}
      </div>
    </div>
  );
}
