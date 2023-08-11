//récupere les données JSON des photographes path : data/photographers.json
export const fetchData = async () => {
  const response = await fetch("./data/recipes.json");
  const data = await response.json();
  return data;
};
