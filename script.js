import movies from "./movies.js";

const kartochki = document.querySelector(".kartochki");
const searchInput = document.querySelector(".search-input");
const selectCategory = document.querySelector(".selectCategory");
const sortSelect = document.querySelector(".sortSelect");


function normalize(movie) {

  console.log("movie:", movie);
  
  return {
    title: movie.Title || movie.title || "",
    image: movie.ImageURL || movie.image || "https://via.placeholder.com/300x400",
    categories: movie.Categories || movie.categories || "",
    runtime: movie.runtime || movie.Runtime || "",
    year: movie.movie_year || movie.year || 0,
    rating: movie.imdb_rating || movie.rating || 0
  };
}

function generator(list) {
  kartochki.innerHTML = "";

  list.forEach(item => {
    const movie = normalize(item);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="./sexpul.jpg" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <span class="type">${movie.categories}</span>
      <span class="long">${movie.runtime}</span>
      <span class="rank">Year: ${movie.year}</span>
      <span class="rating">⭐ ${movie.rating}</span>
      <button>More info</button>
    `;

    kartochki.appendChild(card);
  });
}

let currentMovies = [...movies];
generator(currentMovies);

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  const filtered = currentMovies.filter(item => {
    const movie = normalize(item);
    return movie.title.toLowerCase().includes(value);
  });

  generator(filtered);
});

selectCategory.addEventListener("change", () => {
  const val = selectCategory.value.toLowerCase();

  if (val === "all") {
    currentMovies = [...movies];
  } else {
    currentMovies = movies.filter(item => {
      const movie = normalize(item);
      return movie.categories.toLowerCase().includes(val);
    });
  }

  generator(currentMovies);
});

sortSelect.addEventListener("change", () => {
  let sorted = [...currentMovies];

  switch (sortSelect.value) {
    case "ABC":
      sorted.sort((a, b) => normalize(a).title.localeCompare(normalize(b).title));
      break;
    case "CBA":
      sorted.sort((a, b) => normalize(b).title.localeCompare(normalize(a).title));
      break;
    case "BIG":
      sorted.sort((a, b) => getMinutes(normalize(b).runtime).getMinutes(normalize(a).runtime));
      break;
    case "SMALL":
      sorted.sort((a, b) => getMinutes(normalize(a).runtime).getMinutes(normalize(b).runtime));
      break;
    case "Year":
      sorted.sort((a, b) => normalize(b).year - normalize(a).year);
      break;
    case "Rank":
      sorted.sort((a, b) => normalize(b).rating - normalize(a).rating);
      break;
}

  generator(sorted);
});
