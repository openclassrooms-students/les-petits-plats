import { fetchData } from "./utils/fetchData.js";
import Recipe from "./components/Recipes.js";
import Search from "./components/Search.js";
import DropDown from "./components/DropDown.js";
import Tags from "./components/Tags.js";

const main = async () => {
  let tags = [];
  let recipes = await fetchData();

  Search(recipes);
  DropDown(recipes, tags);
  Tags("",recipes, tags);
  Recipe("",recipes);
};

main();
