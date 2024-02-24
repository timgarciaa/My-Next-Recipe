import { createIngredientAction } from "@/utils/actionUtils";

export default async function IngredientForm() {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col w-full items-center px-20 pb-20">
        <h1 className="text-4xl font-bold mb-4">Add Ingredient</h1>

        <div className="">
          <form className="flex flex-col gap-4" action={createIngredientAction}>
            <div className="flex gap-2 items-center">
              <label htmlFor="name">Name:</label>
              <input
                className="text-black py-1 px-2 rounded-sm"
                type="text"
                name="name"
                id="name"
                required
              />
            </div>
            <button className="bg-[#743f22] text-white px-2 py-2 rounded-lg">
              Add Ingredient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
