import { fetchData } from "../utils/fetchData.js";
import { filterRecipesBySearchValue } from "../utils/filterData.js";
import Recipe from "./Recipes.js";

const Search = (searchValue) => {
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
    searchValue = e.target.value.trim();

    const validInput = /^[A-Za-z]+$/.test(searchValue);

    if (!validInput) {
      searchValue = escapeHTML(searchValue);
      Recipe(searchValue, []);
      return;
    }

    let data = await fetchData();

    if (!searchValue) return Recipe(data, searchValue);

    if (searchValue.length >= 3) {
      data = filterRecipesBySearchValue(data, searchValue);
      Recipe(searchValue, data);
    }
  };

  search.addEventListener("input", handleInput);
  form.addEventListener("submit", (e) => e.preventDefault());
};
export default Search;
