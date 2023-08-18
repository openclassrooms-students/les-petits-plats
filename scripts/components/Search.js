import { fetchData } from "../utils/fetchData.js";
import { filterRecipesBySearchValue } from "../utils/filterData.js";
import Recipe from "./Recipes.js";

const Search = async () => {
  const search = document.querySelector("#search-input");
  const form = document.querySelector("form[name='search']");

  const handleInput = async (e) => {
    const searchValue = e.target.value.trim();

    if (!searchValue) {
      const recipes = await fetchData();
      Recipe(searchValue, recipes);
      return;
    }

    const validInput = /^[A-Za-z]+$/.test(searchValue);

    if (!validInput) {
      const sanitizedValue = escapeHTML(searchValue);
      Recipe(sanitizedValue, []);
      return;
    }

    if (searchValue.length >= 3) {
      const recipes = await fetchData();
      const filteredRecipes = filterRecipesBySearchValue(recipes, searchValue);
      Recipe(searchValue, filteredRecipes);
    }
  };

  search.addEventListener("input", handleInput);
  form.addEventListener("submit", (e) => e.preventDefault());
};

export default Search;
