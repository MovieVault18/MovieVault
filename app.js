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

function loadMovies() {
    fetch('movies.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    movies = results.data;
                    assignRandomMovies();
                }
            });
        })
        .catch(error => console.error('Error loading CSV:', error));
}

function assignRandomMovies() {
    let movieElements = document.querySelectorAll('.movie-list-item');
    let usedIndexes = new Set();

    movieElements.forEach((movieElement) => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * movies.length);
        } while (usedIndexes.has(randomIndex)); // Avoid repetition
        usedIndexes.add(randomIndex);

        let movie = movies[randomIndex];

        movieElement.querySelector('.movie-list-item-img').src = `img/${movie.poster}`;
        movieElement.querySelector('.movie-list-item-title').textContent = movie.name;
        movieElement.querySelector('.movie-list-item-desc').textContent = movie.description;

        // Set up button click to save data and go to details page
        movieElement.querySelector('.movie-list-item-button').addEventListener('click', () => {
            let movieDetails = {
                name: movie.name,
                poster: movie.poster,
                year: movie.year,
                rating: movie.rating,
                description: movie.description
            };
            localStorage.setItem('selectedMovie', JSON.stringify(movieDetails));
            window.location.href = 'details.html';
        });
    });
}

loadMovies();
