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

// Preset movies with assigned numbers
const presetMovies = {
    1: { name: "Inception", poster: "inception.jpg", year: "2010", rating: "8.8", description: "A skilled thief is given a chance at redemption if he can successfully plant an idea into someone's subconscious." },
    2: { name: "The Matrix", poster: "matrix.jpg", year: "1999", rating: "8.7", description: "A hacker learns about the true nature of reality and his role in the war against its controllers." }
};

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
    let movieElements = document.querySelectorAll('.movie-list-item:not(.preset-movies .movie-list-item)');
    let usedIndexes = new Set();

    movieElements.forEach((movieElement) => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * movies.length);
        } while (usedIndexes.has(randomIndex));
        usedIndexes.add(randomIndex);

        let movie = movies[randomIndex];

        movieElement.querySelector('.movie-list-item-img').src = `img/${movie.poster}`;
        movieElement.querySelector('.movie-list-item-title').textContent = movie.name;
        movieElement.querySelector('.movie-list-item-desc').textContent = movie.description;

        movieElement.querySelector('.movie-list-item-button').addEventListener('click', () => {
            saveAndGoToDetails(movie);
        });
    });
}

function searchMovies() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let results = document.getElementById("searchResults");
    results.innerHTML = "";

    if (input.trim() === "") return;

    let filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(input));

    filteredMovies.forEach(movie => {
        let li = document.createElement("li");
        li.textContent = movie.name;
        li.onclick = () => saveAndGoToDetails(movie);
        results.appendChild(li);
    });
}

function saveAndGoToDetails(movie) {
    let movieDetails = {
        name: movie.name,
        poster: movie.poster,
        year: movie.year,
        rating: movie.rating,
        description: movie.description
    };
    localStorage.setItem('selectedMovie', JSON.stringify(movieDetails));
    window.location.href = 'details.html';
}

// Function to get a preset movie by number
function showPresetMovie(movieNumber) {
    if (presetMovies[movieNumber]) {
        let movie = presetMovies[movieNumber];
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        window.location.href = 'details.html';
    } else {
        alert("Movie not found!");
    }
}

loadMovies();
