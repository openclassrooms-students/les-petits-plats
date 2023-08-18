import Card from "./Card.js";

const Recipe = (searchValue = "", recipes) => {
  const recipesContainer = document.querySelector(".recipes-container");
  const totalRecipes = document.querySelector(".total-recipes");
  totalRecipes.textContent = `${recipes.length} recettes`;

  const frame = document.createElement("div");
  frame.classList.add("recipes");

  if (recipes.length === 0 && searchValue.length >= 3) {
    frame.innerHTML = `<h2 class="card__title"> Aucune recette ne contient '${searchValue}' vous pouvez chercher «tarte aux pommes », « poisson », etc.</h2>`;
  } else {
    const cardFragments = document.createDocumentFragment();

    recipes.forEach((recipe) => {
      const card = Card(recipe);
      const cardElement = document.createElement("div");
      cardElement.innerHTML = card;
      cardFragments.appendChild(cardElement);
    });

    frame.appendChild(cardFragments);
  }

  recipesContainer.innerHTML = "";
  recipesContainer.appendChild(frame);
};

export default Recipe;
