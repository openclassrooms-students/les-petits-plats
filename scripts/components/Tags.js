import { handleChangeData } from "../utils/filterData.js";

const Tags = (searchValue, recipes, tags) => {
  const container = document.querySelector(".tags");

  const handleRemoveTag = (tagValue) => {
    const tagIndex = tags.findIndex((tag) => {
      const tagKey = Object.keys(tag)[0];
      const tagName = tag[tagKey];
      return tagName === tagValue;
    });

    if (tagIndex !== -1) {
      tags.splice(tagIndex, 1);
      handleChangeData(searchValue, recipes, tags);
      updateTagsUI();
    }
  };

  const createTag = (tag) => {
    const button = document.createElement("button");
    button.classList.add("tag");

    const key = Object.keys(tag)[0];
    const name = tag[key];
    button.dataset[key] = name;
    button.textContent = name;

    const icon = document.createElement("i");
    icon.classList.add("fa-sharp", "fa-solid", "fa-x", "fa-sm");
    icon.addEventListener("click", () => handleRemoveTag(name));

    button.appendChild(icon);

    return button;
  };

  const updateTagsUI = () => {
    container.innerHTML = "";
    tags.map((tag) => container.appendChild(createTag(tag)));
  };

  updateTagsUI();
};

export default Tags;
