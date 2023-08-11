import { fetchData } from "./utils/fetchData.js";
import Recipe from "./components/Recipes.js";
import Search from "./components/Search.js";
import DropDown from "./components/DropDown.js";
import Tags from "./components/Tags.js";

const main = async () => {
  let tags = [];
  let searchValue = "";

  const recipes = await fetchData();

  Search(searchValue, tags);
  DropDown(searchValue, recipes, tags);
  Tags(searchValue, recipes, tags);
  Recipe(searchValue, recipes);
};

main();
