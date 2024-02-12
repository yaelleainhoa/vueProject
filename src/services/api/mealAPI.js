const getMealsByFirstLetter =
    async function(letter) {
  const pathMeal =
      ' https://www.themealdb.com/api/json/v1/1/search.php?f=' + letter;
  const response = await fetch(pathMeal)
  if (response.status == 200) {
    const data = await response.json()
    return data.meals
  }
  else {
    new Error(response.statusText)
  }
}


const getIngredientsDataById =
    async function(mealId) {
  const pathMeal =
      ' https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId
  const response = await fetch(pathMeal)
  if (response.status == 200) {
    const data = await response.json()
    let ingredients = [];
    for (let i = 1; i < 21 && data.meals[0]['strMeasure' + i] &&
         data.meals[0]['strIngredient' + i];
         i++) {
      let ingredientName = data.meals[0]['strIngredient' + i];
      ingredientName =
          ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);
      let ingredientMesure = data.meals[0]['strMeasure' + i];
      let ingredient = {'name': ingredientName, 'measure': ingredientMesure};
      ingredients.push(ingredient)
    }

    return ingredients
  }
  else {
    new Error(response.statusText)
  }
}

const getIngredients =
    function(meal) {
  let ingredients = [];
  for (let i = 1; i < 21 && meal['strMeasure' + i] && meal['strIngredient' + i];
       i++) {
    let ingredientName = meal['strIngredient' + i];
    ingredientName =
        ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);
    let ingredientMesure = meal['strMeasure' + i];
    let ingredient = {'name': ingredientName, 'measure': ingredientMesure};
    ingredients.push(ingredient)
  }
  return ingredients
}

const getAllDataMeals =
    async function() {
  const letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  const data = [];
  for (const letter of letters) {
    const mealsByLetter = await getMealsByFirstLetter(letter);
    if (mealsByLetter) {
      for (const meal of mealsByLetter) {
        if (meal) {
          const ingredients = getIngredients(meal);
          data.push({'meal': meal, 'ingredients': ingredients});
        }
      }
    }
  }
  return data;
}

export {
  getIngredientsDataById,
      getAllDataMeals, getMealsByFirstLetter
}