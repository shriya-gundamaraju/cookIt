const get_meal_btn = document.getElementById("get_meal");
const meal_container = document.getElementById("meal");

get_meal_btn.addEventListener("click", getMealCallback);

function getMealCallback() {
  var xttp = new XMLHttpRequest();
  xttp.open("GET", "https://www.themealdb.com/api/json/v1/1/random.php");
  xttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(xttp.responseText);
      createMeal(response.meals[0]);
      console.log(response);
    }
  };
  xttp.send();
  console.log("Hello world");
}

function createMeal(meal) {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		    
    <a
        style="position: absolute; bottom: 530px; right: 1100px"
        href="index.html"
        ><button type="button" class="cancelbtn">Home</button></a
    >
    
    <a
        style="position: relative; bottom: 9px; left: 300px"
        href="foodRestrictions.html"
        ><button type="button" class="button-primary" id="get_meal">Get Another Meal 🍔</button></a
    >
      
    <div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${
          meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ""
        }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${
      meal.strYoutube
        ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
        : ""
    }
	`;

  meal_container.innerHTML = newInnerHTML;
}
