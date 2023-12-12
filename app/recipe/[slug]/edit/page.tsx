/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import {
  getRecipe,
  getRecipeIngredients,
  getIngredients,
  updateRecipe,
} from "@/utils/actionUtils";
import { Recipe } from "@/types/recipe.type";
import { Ingredient } from "@/types/ingredient.type";
import ImagePicker from "@/components/imagePicker";

export default function EditRecipe({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState<Recipe>();
  const [title, setTitle] = useState("");
  const [isVegetarian, setIsVegetarian] = useState("false");
  const [servingPortions, setServingPortions] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<any>([]);
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [currentImage, setCurrentImage] = useState<string | undefined>("");
  const [image, setImage] = useState<File>();

  const formData = new FormData();

  useEffect(() => {
    const fetchData = async () => {
      const ingredients = await getIngredients();
      setIngredients(ingredients.map((ingredient: Ingredient) => ingredient));
      const recipe = await getRecipe(slug);
      setRecipe(recipe);
      const recipeIngredients = await getRecipeIngredients(slug);
      const recipeIngredientIds = recipeIngredients.map(
        (ri: any) => ri.ingredient_id
      );
      setSelectedIngredients(recipeIngredientIds);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTitle(recipe?.title || "");
    setIsVegetarian(recipe?.is_vegetarian === "true" ? "true" : "false");
    setServingPortions(recipe?.serving_portions || 0);
    setCookingInstructions(recipe?.cooking_instructions || "");
    setCurrentImage(recipe?.image);
  }, [recipe]);

  const checkBoxChangeHandler = (e: any, ingredient: any) => {
    if (e.target.checked) {
      setSelectedIngredients([...selectedIngredients, ingredient.id]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((id: any) => id !== ingredient.id)
      );
    }
  };

  const updateRecipeHandler = () => {
    formData.append("title", title);
    formData.append("is_vegetarian", isVegetarian);
    formData.append("serving_portions", servingPortions.toString());
    formData.append("cooking_instructions", cookingInstructions);
    formData.append("currentImage", currentImage || "");
    formData.append("ingredients", selectedIngredients);
    if (recipe?.id !== undefined)
      formData.append("id", recipe?.id.toString() || "");
    if (image !== undefined) formData.append("image", image);
    updateRecipe(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formData.append("image", file);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-4xl p-6 rounded shadow-md bg-[#5a453b]">
        <h1 className="text-2xl font-bold mb-4">Update Recipe</h1>
        <form className="flex flex-col gap-4" action={updateRecipeHandler}>
          <label htmlFor="title">Title</label>
          <input
            className="rounded-md p-2 text-black"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="is_vegetarian">Vegetarian</label>
          <select
            className="rounded-md p-2 text-black"
            name="is_vegetarian"
            id="is_vegetarian"
            value={isVegetarian}
            onChange={(e) => setIsVegetarian(e.target.value)}
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
            value={servingPortions}
            onChange={(e) => setServingPortions(parseInt(e.target.value))}
          />
          <label htmlFor="ingredients">Ingredients</label>
          <div className="grid grid-cols-4 gap-4">
            {ingredients.map((ingredient: Ingredient, index: any) => {
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
                    checked={selectedIngredients.includes(ingredient.id)}
                    onChange={(e) => {
                      checkBoxChangeHandler(e, ingredient);
                    }}
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
            value={cookingInstructions}
            onChange={(e) => setCookingInstructions(e.target.value)}
          ></textarea>
          <ImagePicker
            label="Image"
            name="image"
            onChange={handleImageChange}
          />
          <button
            className="bg-[#743f22] text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
