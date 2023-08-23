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

export const filterRecipesByTagsAndSearchValue = (
  recipes,
  tags,
  searchValue
) => {
  const lowerSearchValue = searchValue.toLowerCase();

  return recipes.filter((recipe) => {
    const lowerName = recipe.name.toLowerCase();
    const lowerDescription = recipe.description.toLowerCase();

    const nameOrDescriptionMatch =
      lowerName.includes(lowerSearchValue) ||
      lowerDescription.includes(lowerSearchValue);

    const tagFilteredRecipes =
      tags.length === 0 ? recipes : filterRecipesByTags(recipes, tags);

    if (nameOrDescriptionMatch) {
      return tagFilteredRecipes.includes(recipe); // Vérifier si la recette correspond aux balises filtrées
    }

    const ingredientsMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(lowerSearchValue)
    );

    return tagFilteredRecipes.includes(recipe) && ingredientsMatch;
  });
};

export const filterRecipesByTags = (recipes, tags) => {
  if (tags.length === 0) {
    return recipes; // Pas besoin de filtrer si aucune balise n'est sélectionnée
  }

  return recipes.filter((recipe) => {
    return tags.every((tag) => {
      const tagName = Object.keys(tag)[0]; // Récupérer le nom de la balise (par exemple : "ingredients", "appliance", etc.)
      const tagValue = tag[tagName]; // Récupérer la valeur de la balise (par exemple : "Ail", "Mixer", etc.)

      if (tagName === "ingredients") {
        return recipe.ingredients.some(
          (ingredient) => ingredient.ingredient === tagValue
        );
      }
      if (tagName === "appliance") {
        return recipe.appliance === tagValue;
      }
      if (tagName === "ustensils") {
        return recipe.ustensils.includes(tagValue);
      }

      return true; // Si la balise n'est pas gérée, la considérer comme correspondante
    });
  });
};

export const handleChangeData = (searchValue = "", recipes, tags) => {
  let filteredRecipes;

  if (tags.length === 0 && searchValue.length === 0) {
    filteredRecipes = recipes;
  } else if (tags.length === 0) {
    filteredRecipes = filterRecipesBySearchValue(recipes, searchValue);
  } else if (searchValue.length === 0) {
    filteredRecipes = filterRecipesByTags(recipes, tags);
  } else {
    const filteredValues = filterRecipesBySearchValue(recipes, searchValue);
    filteredRecipes = filterRecipesByTagsAndSearchValue(
      filteredValues,
      tags,
      searchValue
    );
  }

  Recipe(searchValue, filteredRecipes, tags);

  return filteredRecipes;
};
