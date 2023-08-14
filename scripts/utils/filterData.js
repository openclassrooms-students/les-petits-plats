import Recipe from "../components/Recipes.js";

export const filterRecipesBySearchValue = (recipes, searchValue) => {
  return recipes.filter((recipe) => {
    recipe.name.toLowerCase();
    const regex = new RegExp(searchValue, "gi");
    return (
      recipe.name.match(regex) ||
      recipe.description.match(regex) ||
      recipe.ingredients.find((ingredient) =>
        ingredient.ingredient.match(regex)
      )
    );
  });
};

export const filterRecipesByTags = (recipes, tags) =>
  recipes.filter((recipe) => {
    return tags.every((tag) => {
      return recipe.ingredients.some((ingredient) => {
        return (
          ingredient.ingredient == tag.ingredients ||
          recipe.appliance == tag.appliance ||
          recipe.ustensils.includes(tag.ustensils)
        );
      });
    });
  });

export const handleChangeData = (
  searchValue = "",
  recipes,
  tags,
  refresh = true
) => {
  if (searchValue.length >= 3) {
    recipes = filterRecipesBySearchValue(recipes, searchValue);
  }

  if (tags.length > 0) {
    recipes = filterRecipesByTags(recipes, tags);
  }
  if (refresh) Recipe(searchValue, recipes, tags);

  return recipes;
};
