"use client";
import {
  deleteRecipe,
} from "@/utils/actionUtils";
import { useRouter } from "next/navigation";

type Props = {
  recipeId: string;
};

export default function RecipeNav({ recipeId }: Props) {
  const router = useRouter();

  const deleteRecipeFn = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const response = await deleteRecipe(recipeId);
    }
  };
  return (
    <div className="flex items-center gap-4 pb-5">
      <button onClick={() => {router.push(`/recipe/${recipeId}/edit`)}}>Edit</button>
      <button onClick={deleteRecipeFn}>Delete</button>
    </div>
  );
}
