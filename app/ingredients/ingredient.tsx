"use client";
import Button from "@/components/button";
import { deleteIngredient } from "@/utils/actionUtils";
import { useRouter } from "next/navigation";

type Props = {
  ingredient: any;
};

export default function Ingredient({ ingredient }: Props) {
  const router = useRouter();
  const editButtonHandler = () => {
    console.log("edit button clicked");
      router.push(`/ingredients/form/${ingredient.id}`);
  };

  const deleteButtonHandler = async () => {
    console.log("delete button clicked");
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const response = await deleteIngredient(ingredient.id);
    }
  };

  return (
    <div
      key={ingredient.id}
      className="grid grid-cols-2 border-[1px] border-[#743f22] rounded p-2 bg-[#f9f9f9]"
    >
      {ingredient.name}

      <div className="flex gap-2 justify-end">
        <Button label="Edit" onClick={editButtonHandler} color={"#008CBA"} />
        <Button
          label="Delete"
          onClick={deleteButtonHandler}
          color={"#D10000"}
        />
      </div>
    </div>
  );
}
