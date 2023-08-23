import { fetchData } from "../utils/fetchData.js";
import { filterRecipesByTags, handleChangeData } from "../utils/filterData.js";
import Recipe from "./Recipes.js";

const Search = async (recipes, tags) => {
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
    const searchValue = e.target.value.trim();

    if (!searchValue) {
      recipes = await fetchData();
      if (tags.length > 0) recipes = filterRecipesByTags(recipes, tags);
      Recipe("", recipes);
      return;
    }

    const validInput = /^[A-Za-z]+$/.test(searchValue);

    if (!validInput) {
      const sanitizedValue = escapeHTML(searchValue);
      Recipe(sanitizedValue, []);
      console.log("sanitizedValue", sanitizedValue);
      return;
    }
    if (searchValue.length < 3) {
      return;
    }

    const data = handleChangeData(searchValue, recipes, tags);
    Recipe(searchValue, data);
  };

  search.addEventListener("input", handleInput);
  form.addEventListener("submit", (e) => e.preventDefault());
};

export default Search;
