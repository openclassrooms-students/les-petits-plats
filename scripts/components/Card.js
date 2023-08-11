const Ingredients = (ingredients) => {
  return ingredients
    .map(
      (ingredient) =>
        `<li class="ingredient">
           <span class="ingredient__name">${ingredient.ingredient}</span>
            <span class="ingredient__quantity">
        ${ingredient?.quantity ? ingredient?.quantity : ""}${ingredient?.unit ? ingredient?.unit : ""}
            </span>
        </li>`
    )
    .join("");
};

const Card = (recipe) => {
  const { id, image, name, ingredients, time, description } = recipe;

  return `
    <div class="card">
     <span class="card__time">${time} min</span>
        <img src="./assets/recipes/${image}" class="card__image" />
        <div class="card-body">
            <h2 class="card__title">${name}</h2>

            <div class="mb-4">
            <h3 class="card__subtitle">Recette</h3>
            <p class="card__description">${description}</p>
            </div>

            <div class="mt-2">
            <h3 class="card__subtitle">Ingrédients</h3>
            <ul class="ingredients">
                ${Ingredients(ingredients)}
            </ul>
            </div>
        </div>
    </div>`;
};

export default Card;
