import createDropDownListUniqueFactory from "../factories/createDropDownListUniqueFactory.js";
import { handleChangeData } from "../utils/filterData.js";
import Tags from "./Tags.js";

const DropDown = (recipes, tags) => {
  const inputDropdowns = document.querySelectorAll(".dropdown__input");
  const search = document.querySelector("#search-input");
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


  const handleAddTag = (e) => {
    const listDropdown = e.currentTarget.parentNode;
    const contentDropdown = listDropdown.parentNode;
    const dropdown = contentDropdown.parentNode;
    const filterName = dropdown.querySelector(".dropdown__btn").dataset.dropdown;

    const value = e.target.textContent;
    if (tags.some((tag) => tag[filterName] === value)) return;

    tags.push({
      [filterName]: value,
    });


    Tags(search.value, recipes, tags);

    handleChangeData(searchValue, recipes, tags);

    contentDropdown.classList.toggle("show");
  };

  const createListElements = (listDropdown, filterName) => {
    const data = {
      search: search.value,
      recipes: recipes,
      tags: tags,
      refresh: false,
    };

    const list = createDropDownListUniqueFactory(filterName, data);

    const fragment = document.createDocumentFragment();

    list.forEach((sortItem) => {
      const li = document.createElement("li");
      li.textContent = sortItem;
      li.addEventListener("click", handleAddTag);
      fragment.appendChild(li);
    });

    listDropdown.innerHTML = "";
    listDropdown.appendChild(fragment);
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
