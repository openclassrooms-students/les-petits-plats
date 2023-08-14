import { handleChangeData } from "../utils/filterData.js";
import Tags from "./Tags.js";

const DropDown = (recipes, tags) => {
  const inputDropdowns = document.querySelectorAll(".dropdown__input");
  const searchValue = document.querySelector("#search-input").value;
  const btnDropdowns = document.querySelectorAll(".dropdown__btn");

  const handleClick = (e) => {
    const parent = e.currentTarget.parentNode;
    const contentDropdown = parent.querySelector(".dropdown__content");
    const listDropdown = parent.querySelector(".dropdown__list");
    const icon = e.currentTarget.querySelector("i");
    const filterName = e.currentTarget.dataset.dropdown;

    icon.classList.toggle("fa-chevron-down");

    contentDropdown.classList.toggle("show");
    listDropdown.innerHTML = "";

    createListElements(listDropdown, filterName);
  };

  const handleIngredientsListUnique = (
    recipes,
    filterName,
    tags,
    searchValue
  ) => {
    const data = handleChangeData(searchValue, recipes, tags, false);

    const lists = data.map((recipe) => recipe[filterName]);

    const ustensilsList = lists
      .flat()
      .map((ustensils) => ustensils)
      .sort();

    const ingredientsList = lists
      .flat()
      .map((ingredient) => ingredient.ingredient)
      .sort();

    let result = [];

    switch (filterName) {
      case "ingredients":
        result = [...new Set(ingredientsList)];
        break;

      case "appliance":
        result = [...new Set(lists)];
        break;

      case "ustensils":
        result = [...new Set(ustensilsList)];
        break;
    }

    return result;
  };

  const handleAddTag = (e) => {
    const listDropdown = e.currentTarget.parentNode;
    const contentDropdown = listDropdown.parentNode;
    const dropdown = contentDropdown.parentNode;
    const filterName =
      dropdown.querySelector(".dropdown__btn").dataset.dropdown;

    const value = e.target.textContent;
    if (tags.some((tag) => tag[filterName] === value)) return;

    tags.push({
      [filterName]: value,
    });

    console.log("tags", tags);

    Tags(searchValue, recipes, tags);

    handleChangeData(searchValue, recipes, tags);

    contentDropdown.classList.toggle("show");
  };

  const createListElements = (listDropdown, filterName) => {
    handleIngredientsListUnique(recipes, filterName, tags, searchValue).forEach(
      (ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        li.addEventListener("click", handleAddTag);
        listDropdown.appendChild(li);
      }
    );
  };

  const handleFilter = (e) => {
    const value = e.currentTarget.value.trim().toUpperCase();
    const parent = e.currentTarget.parentNode;

    const allLiElements = parent.querySelectorAll(".dropdown__list li");

    allLiElements.forEach((element) => {
      element.addEventListener("click", handleAddTag);
      if (value === "") element.style.display = "";
      const liValue = element.textContent || element.innerText;
      if (liValue.toUpperCase().indexOf(value) > -1) element.style.display = "";
      else element.style.display = "none";
    });
  };

  btnDropdowns.forEach((btn) => {
    btn.addEventListener("click", handleClick);
  });

  inputDropdowns.forEach((inputDropdown) => {
    inputDropdown.addEventListener("keyup", handleFilter);
  });
};

export default DropDown;
