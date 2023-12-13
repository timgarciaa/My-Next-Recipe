describe("Ingredients API Endpoints", () => {
  it("should fetch all ingredients", async () => {
    const res = await fetch("http://localhost:3000/api/ingredients");
    const data = await res.json();

    expect(res.status).toBe(200);

    data.forEach((ingredient) => {
      expect(ingredient).toHaveProperty("id");
      expect(ingredient).toHaveProperty("name");
    });
  });

  it("should fetch a specific ingredient", async () => {
    const res = await fetch("http://localhost:3000/api/ingredients/5");
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveProperty("id", 5);
    expect(data).toHaveProperty("name", "lettuce");
  });
});
