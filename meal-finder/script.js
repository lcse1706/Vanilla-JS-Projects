const input = document.getElementById('search');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const submit = document.getElementById('submit');
const single_mealEl = document.getElementById('single-meal');
const random = document.getElementById('random');

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

function showRecipie(e) {
  const item = e.target;

  if (item.classList.contains('meal-info')) {
    const mealId = item.getAttribute('data-mealID');
    getMealByID(mealId);
  }
}

function getMealByID(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      addMealtoDOM(data);
    });
}

function showRandomRecipie() {
  console.log('click');
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      addMealtoDOM(data);
    });
}

function addMealtoDOM(item) {
  const ingredients = [];
  const mealEl = item.meals[0];

  for (let i = 1; i <= 20; i++) {
    if (mealEl[`strIngredient${i}`]) {
      ingredients.push(
        `${mealEl[`strIngredient${i}`]} - ${mealEl[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${mealEl.strMeal}</h1>
    <img src="${mealEl.strMealThumb}" alt="${mealEl.strMeal}" />
    <div class="single-meal-info">
      ${mealEl.strCategory ? `<p>${mealEl.strCategory}</p>` : ''}
      ${mealEl.strArea ? `<p>${mealEl.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${mealEl.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
`;
}

submit.addEventListener('submit', searchMeal);

meals.addEventListener('click', showRecipie);

random.addEventListener('click', showRandomRecipie);
