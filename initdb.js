const sql = require("better-sqlite3");
const db = sql("recipes.db");

const recipes = [
  {
    title: "Burger",
    cooking_instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
    is_vegetarian: false,
    is_favorite: false,
    serving_portions: 1,
    image: "/images/burger.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Pizza",
    cooking_instructions: `
      1. Prepare the dough:
         Mix 250g of flour with 1 teaspoon of salt. Add 150ml of water and knead until smooth. Let the dough rest for 30 minutes.

      2. Prepare the tomato sauce:
         Mix 100ml of tomato sauce with 1 teaspoon of salt, pepper and dried oregano.

      3. Prepare the toppings:
         Slice 1 onion, 1 bell pepper, 5 mushrooms and 50g of salami.

      4. Roll out the dough:
         Roll out the dough to a large circle, about 30cm in diameter.

      5. Assemble the pizza:
         Spread the tomato sauce on top of the dough. Add the toppings and finish with 100g of grated cheese.

      6. Bake the pizza:
         Bake the pizza in the oven at 250°C for 15 minutes.

      7. Serve:
         Serve hot.
    `,
    is_vegetarian: true,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/pizza.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Salad",
    cooking_instructions: `
      1. Prepare the vegetables:
         Slice 1 onion, 1 cucumber, 1 tomato and 1 bell pepper.

      2. Prepare the dressing:
         Mix 2 tablespoons of olive oil with 1 tablespoon of vinegar. Add salt and pepper to taste.

      3. Assemble the salad:
         Mix the vegetables with the dressing.

      4. Serve:
         Serve cold.
    `,
    is_vegetarian: true,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/salad.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Spaghetti",
    cooking_instructions: `
      1. Prepare the sauce:
         Heat a pan with 2 tablespoons of olive oil. Add 1 sliced onion and 2 cloves of garlic. Cook for 5 minutes. Add 500g of ground beef and cook for 10 minutes. Add 500ml of tomato sauce and cook for 15 minutes.

      2. Cook the spaghetti:
         Bring 1l of water to boil. Add 1 teaspoon of salt and 200g of spaghetti. Cook for 10 minutes.

      3. Serve:
         Serve hot.
    `,
    is_vegetarian: false,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/spaghetti.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Sushi",
    cooking_instructions: `
      1. Prepare the rice:
         Rinse 200g of sushi rice in cold water until the water is clear. Add the rice to a pot with 250ml of water. Bring to boil, then reduce the heat and simmer for 10 minutes. Remove from heat and let rest for 15 minutes.

      2. Prepare the vegetables:
         Slice 1 cucumber, 1 avocado and 1 carrot into long strips.

      3. Prepare the sushi:
         Place a sheet of nori on a bamboo mat. Spread the rice evenly on the nori. Add the vegetables and roll up the mat.

      4. Serve:
         Cut the sushi roll into 8 pieces and serve cold.
    `,
    is_vegetarian: true,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/sushi.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Ramen",
    cooking_instructions: `
      1. Prepare the broth:
         Bring 1l of water to boil. Add 1 tablespoon of salt, 1 tablespoon of soy sauce and 1 tablespoon of miso paste. Add 1 sliced onion, 1 sliced carrot and 1 sliced bell pepper. Simmer for 15 minutes.

      2. Cook the noodles:
         Bring 1l of water to boil. Add 200g of ramen noodles and cook for 5 minutes.

      3. Serve:
         Serve hot.
    `,
    is_vegetarian: true,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/ramen.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Chocolate Cake",
    cooking_instructions: `
      1. Prepare the dough:
         Mix 200g of flour with 100g of sugar, 100g of butter and 1 egg. Add 1 teaspoon of baking powder and 1 tablespoon of cocoa powder. Mix until smooth.

      2. Bake the cake:
         Pour the dough into a baking pan. Bake at 180°C for 30 minutes.

      3. Serve:
         Serve cold.
    `,
    is_vegetarian: true,
    is_favorite: false,
    serving_portions: 4,
    image: "/images/chocolate-cake.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Gyudon",
    cooking_instructions: `
      1. Prepare the sauce:
         Mix 250ml of water with 1 tablespoon of soy sauce, 1 tablespoon of mirin and 1 tablespoon of sugar.

      2. Cook the beef:
         Heat a pan with a bit of oil. Add 200g of sliced beef and cook for 2 minutes. Add the sauce and simmer for 2 minutes.

      3. Serve:
         Serve hot over a bowl of rice.
    `,
    is_vegetarian: false,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/gyudon.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Buffalo Wings",
    cooking_instructions: `
      1. Prepare the chicken:
         Cut 500g of chicken wings into drumettes and wingettes. Mix with 1 tablespoon of salt and 1 tablespoon of pepper.

      2. Prepare the sauce:
         Mix 100g of melted butter with 100ml of hot sauce.

      3. Cook the chicken:
         Heat a pan with a bit of oil. Add the chicken and cook for 5 minutes. Add the sauce and cook for 5 more minutes.

      4. Serve:
         Serve hot with a side of blue cheese dip.
    `,
    is_vegetarian: false,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/buffalo-wings.jpg",
    creation_date: "09-12-2023 15:00",
  },
  {
    title: "Pork Sinigang",
    cooking_instructions: `
      1. Prepare the broth:
         Bring 1l of water to boil. Add 1 tablespoon of salt, 1 tablespoon of soy sauce and 1 tablespoon of miso paste. Add 1 sliced onion, 1 sliced carrot and 1 sliced bell pepper. Simmer for 15 minutes.

      2. Cook the noodles:
         Bring 1l of water to boil. Add 200g of ramen noodles and cook for 5 minutes.

      3. Serve:
         Serve hot.
    `,
    is_vegetarian: false,
    is_favorite: false,
    serving_portions: 2,
    image: "/images/pork-sinigang.jpg",
    creation_date: "09-12-2023 15:00",
  },
];

const ingredients = [
  {
    //1
    name: "ground beef",
    description: "minced beef",
  },
  {
    //2
    name: "burger bun",
    description: "bread roll",
  },
  {
    //3
    name: "cheese",
    description: "dairy product",
  },
  {
    //4
    name: "tomato",
    description: "vegetable",
  },
  {
    //5
    name: "lettuce",
    description: "vegetable",
  },
  {
    //6
    name: "salt",
    description: "mineral",
  },
  {
    //7
    name: "pepper",
    description: "spice",
  },
  {
    //8
    name: "oil",
    description: "fat",
  },
  {
    //9
    name: "flour",
    description: "powder",
  },
  {
    //10
    name: "tomato sauce",
    description: "sauce",
  },
  {
    //11
    name: "oregano",
    description: "herb",
  },
  {
    //12
    name: "onion",
    description: "vegetable",
  },
  {
    //13
    name: "bell pepper",
    description: "vegetable",
  },
  {
    //14
    name: "mushroom",
    description: "vegetable",
  },
  {
    //15
    name: "salami",
    description: "sausage",
  },
  {
    //16
    name: "cucumber",
    description: "vegetable",
  },
  {
    //17
    name: "avocado",
    description: "fruit",
  },
  {
    //18
    name: "carrot",
    description: "vegetable",
  },
  {
    //19
    name: "olive oil",
    description: "oil",
  },
  {
    //20
    name: "vinegar",
    description: "liquid",
  },
  {
    //21
    name: "spaghetti",
    description: "pasta",
  },
  {
    //22
    name: "garlic",
    description: "vegetable",
  },
  {
    //23
    name: "sushi rice",
    description: "rice",
  },
  {
    //24
    name: "nori",
    description: "seaweed",
  },
  {
    //25
    name: "ramen noodles",
    description: "noodles",
  },
  {
    //26
    name: "beef",
    description: "meat",
  },
  {
    //27
    name: "chicken wings",
    description: "poultry",
  },
  {
    //28
    name: "butter",
    description: "dairy product",
  },
  {
    //29
    name: "hot sauce",
    description: "sauce",
  },
  {
    //30
    name: "blue cheese",
    description: "cheese",
  },
  {
    //31
    name: "pork",
    description: "meat",
  },
  {
    //32
    name: "sinigang mix",
    description: "mix",
  },
  {
    //33
    name: "miso paste",
    description: "paste",
  },
  {
    //34
    name: "soy sauce",
    description: "sauce",
  },
  {
    //35
    name: "mirin",
    description: "alcohol",
  },
  {
    //36
    name: "sugar",
    description: "sugar",
  },
  {
    //37
    name: "baking powder",
    description: "powder",
  },
  {
    //38
    name: "cocoa powder",
    description: "powder",
  },
  {
    //39
    name: "egg",
    description: "egg",
  },
  {
    //40
    name: "water",
    description: "liquid",
  },
];

const recipe_ingredients = [
  {
    recipe_id: 1,
    ingredient_id: 1,
  },
  {
    recipe_id: 1,
    ingredient_id: 2,
  },
  {
    recipe_id: 1,
    ingredient_id: 3,
  },
  {
    recipe_id: 1,
    ingredient_id: 4,
  },
  {
    recipe_id: 1,
    ingredient_id: 5,
  },
  {
    recipe_id: 1,
    ingredient_id: 6,
  },
  {
    recipe_id: 1,
    ingredient_id: 7,
  },
  {
    recipe_id: 1,
    ingredient_id: 8,
  },
  {
    recipe_id: 2,
    ingredient_id: 9,
  },
  {
    recipe_id: 2,
    ingredient_id: 10,
  },
  {
    recipe_id: 2,
    ingredient_id: 6,
  },
  {
    recipe_id: 2,
    ingredient_id: 7,
  },
  {
    recipe_id: 2,
    ingredient_id: 11,
  },
  {
    recipe_id: 2,
    ingredient_id: 12,
  },
  {
    recipe_id: 2,
    ingredient_id: 13,
  },
  {
    recipe_id: 2,
    ingredient_id: 14,
  },
  {
    recipe_id: 2,
    ingredient_id: 15,
  },
  {
    recipe_id: 2,
    ingredient_id: 3,
  },
  {
    recipe_id: 3,
    ingredient_id: 12,
  },
  {
    recipe_id: 3,
    ingredient_id: 16,
  },
  {
    recipe_id: 3,
    ingredient_id: 4,
  },
  {
    recipe_id: 3,
    ingredient_id: 13,
  },
  {
    recipe_id: 3,
    ingredient_id: 19,
  },
  {
    recipe_id: 3,
    ingredient_id: 20,
  },
  {
    recipe_id: 3,
    ingredient_id: 6,
  },
  {
    recipe_id: 3,
    ingredient_id: 7,
  },
  {
    recipe_id: 4,
    ingredient_id: 19,
  },
  {
    recipe_id: 4,
    ingredient_id: 12,
  },
  {
    recipe_id: 4,
    ingredient_id: 22,
  },
  {
    recipe_id: 4,
    ingredient_id: 1,
  },
  {
    recipe_id: 4,
    ingredient_id: 10,
  },
  {
    recipe_id: 4,
    ingredient_id: 6,
  },
  {
    recipe_id: 4,
    ingredient_id: 21,
  },
  {
    recipe_id: 5,
    ingredient_id: 23,
  },
  {
    recipe_id: 5,
    ingredient_id: 16,
  },
  {
    recipe_id: 5,
    ingredient_id: 17,
  },
  {
    recipe_id: 5,
    ingredient_id: 18,
  },
  {
    recipe_id: 5,
    ingredient_id: 24,
  },
  {
    recipe_id: 6,
    ingredient_id: 6,
  },
  {
    recipe_id: 6,
    ingredient_id: 34,
  },
  {
    recipe_id: 6,
    ingredient_id: 33,
  },
  {
    recipe_id: 6,
    ingredient_id: 12,
  },
  {
    recipe_id: 6,
    ingredient_id: 18,
  },
  {
    recipe_id: 6,
    ingredient_id: 13,
  },
  {
    recipe_id: 6,
    ingredient_id: 25,
  },
  {
    recipe_id: 7,
    ingredient_id: 9,
  },
  {
    recipe_id: 7,
    ingredient_id: 36,
  },
  {
    recipe_id: 7,
    ingredient_id: 28,
  },
  {
    recipe_id: 7,
    ingredient_id: 39,
  },
  {
    recipe_id: 7,
    ingredient_id: 37,
  },
  {
    recipe_id: 7,
    ingredient_id: 38,
  },
  {
    recipe_id: 8,
    ingredient_id: 40,
  },
  {
    recipe_id: 8,
    ingredient_id: 34,
  },
  {
    recipe_id: 8,
    ingredient_id: 35,
  },
  {
    recipe_id: 8,
    ingredient_id: 36,
  },
  {
    recipe_id: 8,
    ingredient_id: 26,
  },
  {
    recipe_id: 9,
    ingredient_id: 27,
  },
  {
    recipe_id: 9,
    ingredient_id: 6,
  },
  {
    recipe_id: 9,
    ingredient_id: 7,
  },
  {
    recipe_id: 9,
    ingredient_id: 28,
  },
  {
    recipe_id: 9,
    ingredient_id: 29,
  },
  {
    recipe_id: 10,
    ingredient_id: 6,
  },
  {
    recipe_id: 10,
    ingredient_id: 33,
  },
  {
    recipe_id: 10,
    ingredient_id: 32,
  },
  {
    recipe_id: 10,
    ingredient_id: 31,
  },
  {
    recipe_id: 10,
    ingredient_id: 7,
  },
  {
    recipe_id: 10,
    ingredient_id: 12,
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS recipes (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       cooking_instructions TEXT NOT NULL,
       is_vegetarian TEXT NOT NULL,
       is_favorite TEXT NOT NULL,
       serving_portions INTEGER NOT NULL,
       image TEXT NOT NULL,
       creation_date TEXT NOT NULL
    )
`
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS ingredients (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         description TEXT NOT NULL
   )
`
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS recipe_ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      ingredient_id INTEGER,
      FOREIGN KEY(recipe_id) REFERENCES recipes(id),
      FOREIGN KEY(ingredient_id) REFERENCES ingredients(id)
   )
   `
).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO recipes VALUES (
         null,
         @title,
         @cooking_instructions,
         @is_vegetarian,
         @is_favorite,
         @serving_portions,
         @image,
         @creation_date
      )
   `);

   const stmt2 = db.prepare(`
      INSERT INTO ingredients VALUES (
         null,
         @name,
         @description
      )
   `);

   const stmt3 = db.prepare(`
      INSERT INTO recipe_ingredients VALUES (
         null,
         @recipe_id,
         @ingredient_id
      )
   `);

  for (const recipe of recipes) {
    recipe.is_vegetarian = recipe.is_vegetarian.toString();
    recipe.is_favorite = recipe.is_favorite.toString();
    stmt.run(recipe);
  }

  for (const engredient of ingredients) {
    stmt2.run(engredient);
  }

  for (const recipe_ingredient of recipe_ingredients) {
    stmt3.run(recipe_ingredient);
  }
}

initData();
