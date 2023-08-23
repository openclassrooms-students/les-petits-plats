import { handleChangeData } from "../utils/filterData.js";

const createDropDownListUniqueFactory = (
  filterName,
  { search, recipes, tags, refresh }
) => {
  const data = handleChangeData(search, recipes, tags, refresh);

  const lists = data.map((recipe) => recipe[filterName]);

  const flatList = lists.flat();

  let result = [];

  switch (filterName) {
    case "ingredients":
      result = [
        ...new Set(flatList.map((ingredient) => ingredient.ingredient)),
      ];
      break;

    case "appliance":
      result = [...new Set(lists)];
      break;

    case "ustensils":
      result = [...new Set(flatList)];
      break;

    default:
      break;
  }

  return {
    list: result.sort(),
    data,
  };
};

export default createDropDownListUniqueFactory;
