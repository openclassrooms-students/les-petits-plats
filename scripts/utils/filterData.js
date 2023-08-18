import Recipe from "../components/Recipes.js";

export const filterRecipesBySearchValue = (recipes, searchValue) => {
  const lowerSearchValue = searchValue.toLowerCase();

  return recipes.filter((recipe) => {
    const lowerName = recipe.name.toLowerCase();
    const lowerDescription = recipe.description.toLowerCase();

    const nameOrDescriptionMatch =
      lowerName.includes(lowerSearchValue) ||
      lowerDescription.includes(lowerSearchValue);

    if (nameOrDescriptionMatch) {
      return true;
    }

    const ingredientsMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(lowerSearchValue)
    );

    return ingredientsMatch;
  });
};

export const filterRecipesByTags = (recipes, tags) => {
  if (tags.length === 0) {
    return recipes; // Pas besoin de filtrer si aucune balise n'est sélectionnée
  }

  return recipes.filter((recipe) => {
    return tags.every((tag) => {
      if (
        tag.ingredients &&
        !recipe.ingredients.some(
          (ingredient) => ingredient.ingredient === tag.ingredients
        )
      ) {
        return false; // La balise ingrédient ne correspond pas
      }
      if (tag.appliance && recipe.appliance !== tag.appliance) {
        return false; // La balise appareil ne correspond pas
      }
      if (tag.ustensils && !recipe.ustensils.includes(tag.ustensils)) {
        return false; // La balise ustensiles ne correspond pas
      }
      return true; // Toutes les balises correspondent
    });
  });
};

export const handleChangeData = (
  searchValue = "",
  recipes,
  tags,
  refresh = true
) => {
  let filteredRecipes = [...recipes]; // Copie du tableau de recettes pour ne pas modifier l'original

  if (searchValue.length >= 3) {
    filteredRecipes = filterRecipesBySearchValue(filteredRecipes, searchValue);
  }

  if (tags.length > 0) {
    filteredRecipes = filterRecipesByTags(filteredRecipes, tags);
  }

  if (refresh) {
    Recipe(searchValue, filteredRecipes, tags);
  }

  return filteredRecipes;
};
