import Image from "next/image";

export default async function Recipe({ params }: { params: { slug: string } }) {
  const { slug } = params;

  console.log(slug);

  const recipe = await fetch(`http://localhost:3000/api/recipes/${slug}`);
  const recipeJson = await recipe.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl p-6 rounded shadow-md bg-[#5a453b]">
        <h1 className="text-2xl font-bold mb-4">{recipeJson.title}</h1>
        <Image
          className="rounded-lg mb-4"
          src={recipeJson.image}
          alt={recipeJson.title}
          width={300}
          height={300}
        />
        <p className="mb-2"><strong>Vegetarian:</strong> {recipeJson.is_vegetarian}</p>
        <p className="mb-2"><strong>Serving Portions:</strong> {recipeJson.serving_portions}</p>
        <p className="mb-2"><strong>Ingredients:</strong> {recipeJson.ingredients}</p>
        <p className="mb-2"><strong>Cooking Instructions:</strong> {recipeJson.cooking_instructions}</p>
      </div>
    </div>
  );
}