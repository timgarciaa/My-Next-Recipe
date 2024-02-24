# MY NEXT RECIPE

Welcome to My Next Recipe, find your next recipe [here](https://my-next-recipe.vercel.app/)!

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Install the project dependencies by running `npm install`.
1. Initialize the database by running `node initdb.js`.
1. Start the development server by running `npm run dev`.
1. Open your web browser and visit `http://localhost:3000`.


## Tech Stack

This project uses the following technologies:

1. [Next.js](https://nextjs.org/) - I used Next.js features as much as possible and reduce using 3rd party dependencies.
1. [TailwindCSS](https://tailwindcss.com/) - I chose tailwindCSS for fast layout implementation and clean code since the layout are not that complicated.
1. [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) - For the database, this is what used to easily start a simple database.

## Database Solution
 - The database schema consists of three tables: recipes, ingredients, and recipe_ingredients.

 - The recipes table contains information about each recipe.

 - The ingredients table contains information about each ingredient.

 - The recipe_ingredients table is a junction table that establishes a many-to-many relationship between recipes and ingredients.

 ## Test Scenarios

 1. Test Scenario: Viewing a recipe

    - Given I am on the "Recipes" page
    - When I click on a recipe card
    - Then I should be redirected to the recipe details page where I can see the details of the selected recipe.

 1. Test Scenario: Adding a new recipe
    - Given I am on the "Add New Recipe" page
    - When I fill out the form with valid recipe details and click on the "Add Recipe" button
    - Then the new recipe should be added to the database and I should be redirected to the recipe page.

1. Test Scenario: Editing a recipe

    - Given I am on the "Edit Recipe" page for a specific recipe
    - When I change the recipe details and click on the "Update Recipe" button
    - Then the changes should be saved to the database and I should be redirected to the recipe details page where I can see the updated recipe details.

1. Test Scenario: Deleting a recipe

    - Given I am on the Recipe details page
    - When I click on the "Delete" button for a specific recipe
    - Then the recipe should be removed from the database and the recipe should no longer appear on the "Recipes" page.

1. Test Scenario: Favoriting a recipe

    - Given I am on the "Recipe" page
    - When I click the heart on a card recipe
    - Then the card should be put on top of the list in alpahabetical order


## JEST Testing
I have implemented few unit tests to showcase the unit testing of jest. I would love to add more test for the API and UI.

1. I used jest for unit testing.
1. Run command `npm run test`
1. This will run the tests in @/tests

## Credits

The vegan icons used in this project were created by [pikslgrafik](https://www.flaticon.com/authors/pikslgrafik) and are available on [Flaticon](https://www.flaticon.com/free-icons/vegan).