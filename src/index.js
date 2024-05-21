import { API_KEY } from "/api-key/config.js";

const url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/`;

const ingredientSelect1 = document.querySelector("#ingredient-select1");

//adds available drink ingredients from API to dropdown menu
const populateIngredients = () => {
  fetch(`${url}list.php?i=list`)
    .then((r) => r.json())
    .then((data) => {
      for (const ingredient of data.drinks) {
        const selectOption = document.createElement("option");
        selectOption.value = ingredient.strIngredient1;
        selectOption.textContent = ingredient.strIngredient1;
        ingredientSelect1.appendChild(selectOption);
      }
    });
};

//adds submit listener to see cocktail options form and creates variables for ing1, ing2, and ing3. Invokes handleSubmit
const createSubmitListener = () => {
  const form = document.querySelector("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    const Ing1 = e.target["select-ingredient1"].value;
    //scrolls to drink section when see cocktail options is clicked
    const availableDrinks = document.querySelector("#available-drinks");
    availableDrinks.scrollIntoView({ behavior: "smooth" });
    handleSubmit(Ing1);
  });
};

let selectedDrink;
const availableDrinkList = document.querySelector("#availableDrinks");

//when invoked from submit form event:
//step 1: refresh available drink list
//step 2: fetch drinks from API based on ingredient selection query.
//step 3: Populates available drink list with all avaialble drinks based on query inside new LIs
//step 4: adds click event listener to new LIs
//step 5: event listener, when triggered, fetches drink information by selected drink Id
//step 6: event listener, when triggered, adds applicable elements to DOM from API
const handleSubmit = (Ing1) => {
  availableDrinkList.innerHTML = "";
  fetch(`${url}filter.php?i=${Ing1}`)
    .then((r) => r.json())
    .then((data) => {
      //loops through object items for data and adds event listener for new element
      for (const drink of data.drinks) {
        const ing1Li = document.createElement("li");
        ing1Li.addEventListener("click", (e) => {
          const clickedElement = e.target;
          const drinkId = clickedElement.id;
          const drinkName = clickedElement.textContent;
          const cocktailElement = document.querySelector(".cocktail-name");
          cocktailElement.textContent = drinkName;
          //scrolls to cocktail section when cocktail li is clicked
          const cocktailNameDiv = document.querySelector("#cocktail-name");
          cocktailNameDiv.scrollIntoView({ behavior: "smooth" });
          selectedDrink = drink;
          fetch(`${url}lookup.php?i=${drinkId}`)
            .then((r) => r.json())
            .then((data) => {
              //image
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
              //ingredient
              const ingredientsList = document.getElementById("Ingredients-ul");
              ingredientsList.innerHTML = "";
              const ingredients = [];
              for (let i = 1; i <= 15; i++) {
                const ingredientName = data.drinks[0][`strIngredient${i}`];
                const measure = data.drinks[0][`strMeasure${i}`];
                if (ingredientName && ingredientName.trim() !== "") {
                  ingredients.push(`${measure} ${ingredientName}`);
                }
              }
              ingredients.forEach((ingredient) => {
                const li = document.createElement("li");
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
              });
              //recipe
              const recipeList = document.getElementById("Recipe-ul");
              recipeList.innerHTML = "";
              const instructions = data.drinks[0].strInstructions.split("\n");
              instructions.forEach((instruction) => {
                if (instruction.trim() !== "") {
                  const li = document.createElement("li");
                  li.textContent = instruction.trim();
                  recipeList.appendChild(li);
                }
              });
              //create button in DOM if button is not already there
              const buttonDiv = document.querySelector("#buttonDiv");
              if (buttonDiv.innerHTML === "") {
                console.log("true");
                const button = document.createElement("button");
                button.id = "favorites";
                button.textContent = "SAVE TO FAVORITES";
                buttonDiv.append(button);
                button.addEventListener("click", (e) => {
                  handleFavorite(drinkId);
                  buttonDiv.innerHTML = "";
                  //scrolls to favorites when add to favorites button clicked
                  const favoritesDiv = document.querySelector("#favoritesDiv");
                  favoritesDiv.scrollIntoView({ behavior: "smooth" });
                });
              }
            });
        });
        //append Li element to dom
        ing1Li.textContent = drink.strDrink;
        ing1Li.id = drink.idDrink;
        ing1Li.className = "clickable";
        availableDrinkList.append(ing1Li);
      }
    });
};

//when invoked, creates li element inside favorites list for drink that was displayed, saves id
const handleFavorite = (drinkId) => {
  const favoritesList = document.querySelector("#favoritesList");
  const li = document.createElement("li");
  li.addEventListener("click", (e) => {
    console.log(`${drinkId} clicked`);
    handleClick(drinkId);
    //scrolls to cocktail section when favorite li is clicked
    const cocktailNameDiv = document.querySelector("#cocktail-name");
    cocktailNameDiv.scrollIntoView({ behavior: "smooth" });
  });
  li.textContent = selectedDrink.strDrink;
  li.className = "favoriteItem";
  li.id = selectedDrink.idDrink;
  favoritesList.append(li);
};

//waits for dom to load, then invokes main
document.addEventListener("DOMContentLoaded", () => {
  main();
});

//invokes initial form population event and event listener functions
const main = () => {
  populateIngredients();
  createSubmitListener();
  hoverSubmitEvent();
};

const ingredientsList = document.getElementById("Ingredients-ul");
const recipeElement = document.querySelector("#Recipe-ul");

//refreshes ingredients and recipes lists
//repopulates DOM with clicked favorite Li data based on fetch with Id
const handleClick = (drinkId) => {
  fetch(`${url}lookup.php?i=${drinkId}`)
    .then((r) => r.json())
    .then((data) => {
      //name
      const cocktailName = document.querySelector(".cocktail-name");
      cocktailName.textContent = data.drinks[0].strDrink;
      //image
      const displayImageDiv = document.querySelector("#cocktail-image");
      displayImageDiv.src = data.drinks[0].strDrinkThumb;
      displayImageDiv.alt = data.drinks[0].strDrink;
      //ingredient
      const ingredientsList = document.getElementById("Ingredients-ul");
      ingredientsList.innerHTML = "";
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientName = data.drinks[0][`strIngredient${i}`];
        const measure = data.drinks[0][`strMeasure${i}`];
        if (ingredientName && ingredientName.trim() !== "") {
          ingredients.push(`${measure} ${ingredientName}`);
        }
      }
      ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
      //recipe
      const recipeList = document.getElementById("Recipe-ul");
      recipeList.innerHTML = "";
      const instructions = data.drinks[0].strInstructions.split("\n");
      instructions.forEach((instruction) => {
        if (instruction.trim() !== "") {
          const li = document.createElement("li");
          li.textContent = instruction.trim();
          recipeList.appendChild(li);
        }
      });
    });
};

//add mouseover and mouseout events to see cocktail options button to change color
const hoverSubmitEvent = () => {
  const formSubmit = document.querySelector("#form-submit");
  formSubmit.addEventListener("mouseover", function () {
    formSubmit.style.backgroundColor = "rgb(148, 93, 167)";
    formSubmit.style.color = "white";
  });
  formSubmit.addEventListener("mouseout", function () {
    formSubmit.style.backgroundColor = "rgb(86, 15, 109)";
    formSubmit.style.color = "white";
    console.log("mouse over button");
  });
};