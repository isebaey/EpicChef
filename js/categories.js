var categoryImg = document.querySelector(".categoryImg");
var categoryKind = document.querySelector(".category");
var rowOfAllCat = document.querySelector(".rowOfAllCat");
var backToCat = document.querySelector(".backToCat");
categoryDesc = document.querySelector(".desc");
const loader = document.querySelector(".showbox");

var myCategories = [];
var mymeals = [];
var myMeal = [];
var selectedCat = "";

async function getCategories() {
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  var response = await api.json();
  myCategories = response.categories;
  loader.classList.add("d-none");

  var cartona = "";
  for (let i = 0; i < myCategories.length; i++) {
    // Use slice to limit the description to 150 characters
    const shortDescription = myCategories[i].strCategoryDescription.slice(
      0,
      150
    );

    cartona += `
    <div class="col-md-3 mb-3">
      <div class="card mx-auto w-75">
        <img
          src="${myCategories[i].strCategoryThumb}"
          alt="img"
          class="categoryImg"
        />
        <div class="card__content position-absolute bottom-0 start-0 w-100 h-100">
          <h3 class="categoryKind">${myCategories[i].strCategory}</h3>
          <p class="desc">${shortDescription}</p>
        </div>
      </div>
    </div>
  `;
  }
  rowOfAllCat.innerHTML = cartona;
}

function getSelectedCat() {
  document.addEventListener("click", function (event) {
    var colMd3 = event.target.closest(".col-md-3");
    if (colMd3) {
      var category = colMd3.querySelector(".categoryKind").innerText;
      selectedCat = category;
      showMealsInCategory(selectedCat);
    }
  });
}
getCategories();
getSelectedCat();

async function showMealsInCategory(selected) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selected}`
  );
  var response = await api.json();
  /*   myCategories = response.meals; // Assuming categories are directly in the response array
   */
  mymeals = response.meals;
  var cartona = "";
  for (let i = 0; i < mymeals.length; i++) {
    cartona += `
    
    <div class="col-md-3 ">
    <div class="card mx-auto" style="width: 18rem">
      <div class="oneOfMeals" id="${mymeals[i].idMeal}">
      <img
      src="${mymeals[i].strMealThumb}"
      class="card-img-top"
      alt="img"
      />
      <div class="card-body">
      <h3 class="card-title text-center" ">${mymeals[i].strMeal}</h3>
      </div>
      </div>    </div>
  </div>
    `;
    backToCat.classList.remove("d-none");
    console.log(mymeals[i].idMeal);
  }
  rowOfAllCat.innerHTML = cartona;
}

function getSelectedMeal() {
  document.addEventListener("click", function (event) {
    var oneOfMeals = event.target.closest(".oneOfMeals");
    if (oneOfMeals) {
      var selectedMealId = oneOfMeals.id;
      console.log(selectedMealId);

      // Save the selectedMealId to local storage
      localStorage.setItem("selectedMealId", selectedMealId);

      // Redirect to the singleMeal.html page
      window.location.href = "singleMeal.html";
    }
  });
}

async function showMealData(selected) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selected}`
  );

  var response = await api.json();
  /*   myCategories = response.meals; // Assuming categories are directly in the response array
   */
  myMeal = response.meals;
  var cartonaMeal = `
    
    <div class="meal-data">
    <div class="col-md-4 text-center">
      <img src="${myMeal.strMealThumb}" class="img-fluid" alt="" />
      <h2 class="py-2 fw-bold">${myMeal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2 class="fs-1 mb-4">Insttructions</h2>
      <p class="fs-3 mb-5">${myMeal.strInstructions}</p>
      <h3 class="fw-bold">Area : ${myMeal.strArea}</h3>
      <h3 class="fw-bold mb-4">Category : ${myMeal.strCategory}</h3>
      <h3 class="fw-bold">Recipes :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap mb-4">
        <li class="alert alert-info m-2 p-1">1 cup Olive Oil</li>
          1 Sesame Seed Burger Buns
        </li>
      </ul>
      <h3 class="fw-bold">Tags :</h3>
      <a href="${myMeal.strSource}" class="btn btn-lg btn-success">Source</a>
      <a href="${myMeal.strYoutube}" class="btn btn-lg btn-danger">Youtube</a>
    </div>
  </div>
`;
  console.log(cartonaMeal);
}

getSelectedMeal();
showMealData();
