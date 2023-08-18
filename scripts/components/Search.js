import { fetchData } from "../utils/fetchData.js";
import { filterRecipesBySearchValue } from "../utils/filterData.js";
import Recipe from "./Recipes.js";

const Search = (recipes) => {
  const search = document.querySelector("#search-input");
  const form = document.querySelector("form[name='search']");

  const escapeHTML = (input) => {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const handleInput = async (e) => {
   let searchValue = e.target.value.trim();

    if (!searchValue) {
      recipes = await fetchData();

      return Recipe(searchValue, recipes);
    }

    const validInput = /^[A-Za-z]+$/.test(searchValue);

    if (!validInput) {
      searchValue = escapeHTML(searchValue);
      Recipe(searchValue, []);
      return;
    }

    if (searchValue.length >= 3) {
      // tags.push([]);
      recipes = await fetchData();
      recipes = filterRecipesBySearchValue(recipes, searchValue);
      Recipe(searchValue, recipes);
    }
  };

  search.addEventListener("input", handleInput);
  form.addEventListener("submit", (e) => e.preventDefault());
};
export default Search;
