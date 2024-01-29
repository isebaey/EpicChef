var searchedMeal = document.querySelector(".searchedMeal");
var myMeal = [];

async function searchForAMeal(input) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
  );
  var response = await api.json();
  myMeal = response.meals;
  console.log(myMeal);
  var cartona = "";
  for (let i = 0; i < myMeal.length; i++) {
    cartona += `
    <div class="col-md-3 mb-3 w-25" >

      <div class="card mx-auto oneOfMeals" onclick="getSelectedMeal(${myMeal[i].idMeal})">
        <img
          src="${myMeal[i].strMealThumb}"
          alt="img"
          class="categoryImg img-fluid"
        />
          <h3 class="categoryKind">${myMeal[i].strMeal}</h3>
      </div>
    </div>
  `;
  }
  searchedMeal.innerHTML = cartona;
}

async function searchForAMealByLetter(input) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
  );
  var response = await api.json();
  myMeal = response.meals;
  console.log(myMeal);
  var cartona = "";
  for (let i = 0; i < myMeal.length; i++) {
    cartona += `
    <div class="col-md-3 mb-3 w-25" >

      <div class="card mx-auto oneOfMeals" onclick="getSelectedMeal(${myMeal[i].idMeal})">
        <img
          src="${myMeal[i].strMealThumb}"
          alt="img"
          class="categoryImg img-fluid"
        />
          <h3 class="categoryKind">${myMeal[i].strMeal}</h3>
      </div>
    </div>
  `;
  }
  searchedMeal.innerHTML = cartona;
}

function getSelectedMeal(selected) {
  // Save the selectedMealId to local storage
  localStorage.setItem("selectedMealId", selected);

  // Redirect to the singleMeal.html page
  window.location.href = "singleMeal.html";
}
