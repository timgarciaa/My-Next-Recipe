/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { getIngredientAction, updateIngredientAction } from "@/utils/actionUtils";

export default function IngredientUpdateForm({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [ingredient, setIngredient] = useState({
    name: "",
  });
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const ingredient = await getIngredientAction(id);
      setIngredient(ingredient);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIngredient(ingredient);
    setName(ingredient.name);
  }, [ingredient]);

  const updateIngredientHandler = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("id", id);
    updateIngredientAction(formData);
  }

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col w-full items-center px-20 pb-20">
        <h1 className="text-4xl font-bold mb-4">Update Ingredient</h1>

        <div className="">
          <form className="flex flex-col gap-4" action={updateIngredientHandler}>
            <div className="flex gap-2 items-center">
              <label htmlFor="name">Name:</label>
              <input
                className="text-black py-1 px-2 rounded-sm"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="bg-[#743f22] text-white px-2 py-2 rounded-lg">
              Update Ingredient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
