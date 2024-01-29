var rowOfAllIngredients = document.querySelector(".rowOfAllIngredients");
var myMeals = [];

async function getIngredientsMeals(ingredient) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  var response = await api.json();
  myMeals = response.meals;
  console.log(myMeals);
  var cartona = "";
  for (let i = 0; i < myMeals.length; i++) {
    cartona += `
    <div class="col-md-3 mb-3 w-25" >
      <div class="card mx-auto oneOfMeals" onclick="getSelectedMeal(${myMeals[i].idMeal})">
        <img
          src="${myMeals[i].strMealThumb}"
          alt="img"
          class="categoryImg img-fluid"
        />
          <h3 class="categoryKind">${myMeals[i].strMeal}</h3>
      </div>
    </div>
  `;
  }
  rowOfAllIngredients.innerHTML = cartona;
}

function getSelectedMeal(selected) {
  // Save the selectedMealId to local storage
  localStorage.setItem("selectedMealId", selected);

  // Redirect to the singleMeal.html page
  window.location.href = "singleMeal.html";
}
