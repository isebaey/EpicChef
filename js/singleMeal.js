const rowData = document.getElementById("row-data");
const selectedMealId = localStorage.getItem("selectedMealId");

async function showMealData() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`
  );

  var response = await api.json();
  const myMeal = response.meals[0];

  var cartonaMeal = `
  <div class="container">
    <div class="meal-data row">
      <div class="col-md-4 text-center">
        <img src="${myMeal.strMealThumb}" class="img-fluid" alt="" />
        <h2 class="py-2 fw-bold">${myMeal.strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2 class="fs-1 mb-4">Instructions</h2>
        <p class="fs-3 mb-5">${
          myMeal.strInstructions.length > 500
            ? `${myMeal.strInstructions.slice(0, 500)}...`
            : myMeal.strInstructions
        }</p>
        <h3 class="fw-bold">Area: ${myMeal.strArea}</h3>
        <h3 class="fw-bold mb-4">Category: ${myMeal.strCategory}</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap mb-4">
          ${generateIngredientsList(myMeal)}
        </ul>
        <h3 class="fw-bold">Tags :</h3>
        <a href="${myMeal.strSource}" class="btn btn-lg btn-success">Source</a>
        <a href="${myMeal.strYoutube}" class="btn btn-lg btn-danger">Youtube</a>
      </div>
    </div>
  </div>
`;
  // Function to generate ingredients list items
  function generateIngredientsList(meal) {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      // Check if both ingredient and measure have values
      if (ingredient && measure) {
        ingredientsList += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
      }
    }
    return ingredientsList;
  }
  rowData.innerHTML = cartonaMeal;
}

showMealData();
