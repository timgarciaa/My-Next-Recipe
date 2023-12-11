import ImagePicker from "@/components/imagePicker";
import { addRecipe } from "@/utils/actionUtils";

export default async function RecipeAddForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl p-6 rounded shadow-md bg-[#5a453b]">
        <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>
        <form className="flex flex-col gap-4" action={addRecipe}>
          <label htmlFor="title">Title</label>
          <input
            className="rounded-md p-2 text-black"
            type="text"
            name="title"
            id="title"
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
          />
          <label htmlFor="cooking_instructions">Cooking Instructions</label>
          <textarea
            className="rounded-md p-2 text-black"
            name="cooking_instructions"
            id="cooking_instructions"
            cols={30}
            rows={10}
          ></textarea>
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
