const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.toggle,.dropdown a,.movie-list-item h4"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});


function goToGenre(genre) {
  window.location.href = `genre.html?genre=${genre}`;
}


window.onload = function () {
  let savedUser = localStorage.getItem("username");
  let loginBtn = document.getElementById("loginBtn");

  if (savedUser) {
      loginBtn.textContent = savedUser;
      loginBtn.classList.add("logged-in");

      loginBtn.addEventListener("click", function () {
          let confirmLogout = confirm("Do you want to logout?");
          if (confirmLogout) {
              localStorage.removeItem("username"); // Remove saved username
              location.reload(); // Refresh page
          }
      });
  } else {
      loginBtn.addEventListener("click", function () {
          window.location.href = "login.html"; // Redirect to login page
      });
  }
};

let movies = [];

fetch("movies.json")
  .then(response => response.json())
  .then(data => {
    movies = data;
    displayRandomMovies();
  });

function displayRandomMovies() {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  let randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 6);

  randomMovies.forEach((movie, index) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-list-item");
    movieItem.setAttribute("data-name", movie.name);
    movieItem.innerHTML = `
      <img class="movie-list-item-img" src="${movie.poster}" alt="">
      <span class="movie-list-item-title">${movie.name}</span>
      <p class="movie-list-item-desc">${movie.description}</p>
      <button class="movie-list-item-button" onclick="showMovieDetails('${movie.name}')">Details</button>
      <h4>${movie.name}</h4>
    `;
    movieList.appendChild(movieItem);
  });
}

function searchMovies() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(query));

  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  filteredMovies.forEach(movie => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-list-item");
    movieItem.setAttribute("data-name", movie.name);
    movieItem.innerHTML = `
      <img class="movie-list-item-img" src="${movie.poster}" alt="">
      <span class="movie-list-item-title">${movie.name}</span>
      <p class="movie-list-item-desc">${movie.description}</p>
      <button class="movie-list-item-button" onclick="showMovieDetails('${movie.name}')">Details</button>
      <h4>${movie.name}</h4>
    `;
    movieList.appendChild(movieItem);
  });
}
function showMovieDetails(movieName) {
  localStorage.setItem("selectedMovie", movieName);
  window.location.href = "details.html";
}
