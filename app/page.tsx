import Image from "next/image";
import Card from "@/components/card";

export default async function Home() {

  const recipes = await fetch('http://localhost:3000/api/recipes');
  const recipesJson = await recipes.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-3 gap-10">

        {recipesJson.map((recipe: any) => {
          return (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              servingPortions={recipe.serving_portions}
              isVegetarian={recipe.is_vegetarian === 'true'}
              isFavorite={recipe.is_favorite === 'true'}
              image={recipe.image}
            />
          );
        })}

      </div>
    </main>
  );
}
