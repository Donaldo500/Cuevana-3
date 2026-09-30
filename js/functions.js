/*

//document.addEventListener("DOMContentLoaded", loadPokemons);

const searchPokemon = async () => {
  const pokemonName = document.getElementById('pokemon-search').value.toLowerCase();
  if(pokemonName){
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonGrid = document.getElementById('pokemon-grid');
      pokemonGrid.innerHTML = '';
      const pokemonCard = createPokemonCard(response.data);
      pokemonGrid.appendChild(pokemonCard);
      
    }catch (error) {
      console.error('Error al buscar el Pokemon', error);
    } 
  }
};

//document.getElementById('search-button').addEventListener('click', searchPokemon);

document.getElementById('pokemon-search').addEventListener('keypress', function (e) {
  if(e.key === "Enter"){
    searchPokemon();
  }
});
*/

const createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.classList.add("movies-grid");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("movie-info");

  const name = document.createElement("h2");
  name.textContent = movie.title;
  infoDiv.appendChild(name);

  const description = document.createElement("p");
  description.textContent = movie.overview;
  description.setAttribute("id", "description");
  infoDiv.appendChild(description);

  card.appendChild(infoDiv);

  const imagen = movie.backdrop_path;
  card.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${imagen}')`;
  card.style.backgroundSize = "cover";
  card.style.backgroundPosition = "center";

  return card;
};

const loadMovies = async () => {
  const moviesGrid = document.getElementById("movies-grid");

  // La clave se define en js/config.js (no versionado), a partir de js/config.example.js
  const apiKey = window.ENV && window.ENV.TMDB_API_KEY;
  if (!apiKey) {
    moviesGrid.innerHTML = '<p>Falta la clave de TMDB. Copia js/config.example.js como js/config.js y agrega tu TMDB_API_KEY.</p>';
    console.error("TMDB_API_KEY no esta definida en js/config.js");
    return;
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: apiKey,
        language: 'es-MX',
        sort_by: 'popularity.desc',
        page: 1
      }
    });
    console.log(response);

    const movies = response.data.results;
    moviesGrid.innerHTML = '';

    for (const movie of movies) {
      const movieCard = createMovieCard(movie);
      moviesGrid.appendChild(movieCard);
    }

    const cards = document.querySelectorAll(".movies-grid");
      cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
        card.scrollTop = 0;
      });
    });

  }catch (error) {
    console.log("Error fetch:", error);
  }
}



document.addEventListener("DOMContentLoaded", loadMovies);


