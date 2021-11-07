const input = document.getElementById('search');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const submit = document.getElementById('submit');

function searchMeal(e) {
  e.preventDefault();

  console.log(input.value);

  if (input.value === '') {
    alert('Type meal');
  }

  const term = input.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results for ${term}</p>`;
      } else {
        meals.innerHTML = data.meals
          .map(
            (meal) => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
      `
          )
          .join('');
      }
    });

  search.value = '';
}

submit.addEventListener('submit', searchMeal);
