import {
  handleChangeData,
} from "../utils/filterData.js";
import Tags from "./Tags.js";

const DropDown = (searchValue, recipes, tags) => {
  const boutonDropdown = document.querySelector(".dropdown__btn");
  const contentDropdown = document.querySelector(".dropdown__content");
  const inputDropdown = document.querySelector(".dropdown__input");
  const listDropdown = document.querySelector(".dropdown__list");

  const filterName = boutonDropdown.dataset.dropdown;

  let data = recipes;


  const ingredients = data.map((recipe) => recipe[filterName]);

  const ingredientsList = ingredients
    .flat()
    .map((ingredient) => ingredient.ingredient)
    .sort();

  const ingredientsListUnique = [...new Set(ingredientsList)];


  const handleAddTag = (e) => {
    const value = e.target.textContent;
    if (tags.some((tag) => tag[filterName] === value)) return;

    tags.push({
      [filterName]: value,
    });

    Tags(searchValue, recipes, tags);

    handleChangeData(searchValue, recipes, tags, data);

    console.log("tags", tags);
    contentDropdown.classList.toggle("show");
  };

  const createListElements = () => {
    ingredientsListUnique.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      li.addEventListener("click", handleAddTag);
      listDropdown.appendChild(li);
    });
  };

  const handleFilter = (e) => {
    const value = e.target.value.trim().toUpperCase();
    const allLiElements = listDropdown.querySelectorAll("li");

    allLiElements.forEach((element) => {
      element.addEventListener("click", handleAddTag);
      if (value === "") element.style.display = "";
      const liValue = element.textContent || element.innerText;
      if (liValue.toUpperCase().indexOf(value) > -1) element.style.display = "";
      else element.style.display = "none";
    });
  };

  const handleClick = () => {
    contentDropdown.classList.toggle("show");
    listDropdown.innerHTML = "";
    createListElements();
  };

  boutonDropdown.addEventListener("click", handleClick);
  inputDropdown.addEventListener("keyup", handleFilter);
};

export default DropDown;
