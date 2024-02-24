"use client";
import { useState, useEffect } from "react";
import ImagePicker from "@/components/imagePicker";
import { addRecipeAction, getIngredientsAction } from "@/utils/actionUtils";
import { Ingredient } from "@/types/ingredient.type";

export default function RecipeAddForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ingredients = (await getIngredientsAction()) as Ingredient[];
      setIngredients(ingredients.map((ingredient: Ingredient) => ingredient));
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-4xl p-6 rounded shadow-md bg-[#5a453b]">
        <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>
        <form className="flex flex-col gap-4" action={addRecipeAction}>
          <label htmlFor="title">Title</label>
          <input
            className="rounded-md p-2 text-black"
            type="text"
            name="title"
            id="title"
            required
          />
          <label htmlFor="is_vegetarian">Vegetarian</label>
          <select
            className="rounded-md p-2 text-black"
            name="is_vegetarian"
            id="is_vegetarian"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="serving_portions">Serving Portions</label>
          <input
            className="rounded-md p-2 text-black"
            type="number"
            name="serving_portions"
            id="serving_portions"
            required
          />
          <label htmlFor="ingredients">Ingredients</label>
          <div className="grid grid-cols-4 gap-4">
            {ingredients.map((ingredient: Ingredient, index) => {
              const ingredientId =
                ingredient.id !== undefined ? ingredient.id.toString() : "";
              return (
                <div key={index}>
                  <input
                    className="rounded-md p-2 text-black"
                    type="checkbox"
                    name="ingredients"
                    id={ingredientId}
                    value={ingredient.id}
                  />
                  <label htmlFor={ingredient.name} className="pl-2">
                    {ingredient.name}
                  </label>
                </div>
              );
            })}
          </div>
          <label htmlFor="cooking_instructions">Cooking Instructions</label>
          <textarea
            className="rounded-md p-2 text-black"
            name="cooking_instructions"
            id="cooking_instructions"
            cols={30}
            rows={10}
            required
          />
          <ImagePicker label="Image" name="image" />
          <button
            className="bg-[#743f22] text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
