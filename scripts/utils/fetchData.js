//récupere les données JSON des photographes path : data/photographers.json
export const fetchData = async () => {
  const response = await fetch("./data/recipes.json");
  return await response.json();
};
