
describe("Recipe API Endpoints", () => {
  it("should fetch all recipes", async () => {
    const res = await fetch("http://localhost:3000/api/recipes");
    const data = await res.json();

    expect(res.status).toBe(200);

    data.forEach((recipe) => {
      expect(recipe).toHaveProperty("id");
      expect(recipe).toHaveProperty("title");
      expect(recipe).toHaveProperty("cooking_instructions");
      expect(recipe).toHaveProperty("is_vegetarian");
      expect(recipe).toHaveProperty("is_favorite");
      expect(recipe).toHaveProperty("serving_portions");
      expect(recipe).toHaveProperty("image");
      expect(recipe).toHaveProperty("creation_date");
    });
  });

  it("should fetch a specific recipe", async () => {
    const res = await fetch("http://localhost:3000/api/recipes/5");
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveProperty("id", 5);
    expect(data).toHaveProperty("title", "Sushi");
    expect(data).toHaveProperty("is_vegetarian", "true");
    expect(data).toHaveProperty("is_favorite", "true");
    expect(data).toHaveProperty("serving_portions", 2);
    expect(data).toHaveProperty("image", "/images/sushi.jpg");
    expect(data).toHaveProperty("creation_date", "09-12-2023 15:00");
  });
});

