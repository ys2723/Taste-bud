// import { sortMovies } from './sortMovies';

  const API_KEY = 'api_key=774c45332d4ea2aafdb9848019af87e5';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const searchURL = BASE_URL + '/search/movie?' + API_KEY;
  
  const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  const popularMoviesSection = document.getElementById('popular-movies');
  let width = popularMoviesSection.getBoundingClientRect().width;
  width = width / 320;
  width = Number(width);
  
  // Declare filter variables
  const genreSelect = document.getElementById('Genre');
  const yearInput = document.querySelector('.year-bar');
  const ratingSelect = document.getElementById('rating');
  
  // Fetch data from the API
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
  
      for (let i = 0; i < width; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
  
        const movieImage = document.createElement('img');
        movieImage.src = IMG_URL + movies[i].poster_path;
        movieImage.alt = movies[i].title + ' Poster';
        card.appendChild(movieImage);
  
        popularMoviesSection.appendChild(card);
      }
  
      // Apply filters function
      function applyFilters() {
        const selectedGenre = genreSelect.value;
        const selectedYear = yearInput.value;
        const selectedRating = ratingSelect.value;
  
        let filterURL = API_URL;
  
        if (selectedGenre) {
          filterURL += `&with_genres=${selectedGenre}`;
        }
        if (selectedYear) {
          filterURL += `&primary_release_year=${selectedYear}`;
        }
        if (selectedRating === 'Highest') {
          filterURL += '&sort_by=vote_average.desc';
        } else if (selectedRating === 'Lowest') {
          filterURL += '&sort_by=vote_average.asc';
        }
  
        fetch(filterURL)
          .then(response => response.json())
          .then(data => {
            popularMoviesSection.innerHTML = '';
  
            const movies = data.results;
            for (let i = 0; i < width && i < movies.length; i++) {
              const card = document.createElement('div');
              card.classList.add('card');
  
              const movieImage = document.createElement('img');
              movieImage.src = IMG_URL + movies[i].poster_path;
              movieImage.alt = movies[i].title + ' Poster';
              card.appendChild(movieImage);
  
              popularMoviesSection.appendChild(card);
            }
          })
          .catch(error => console.error('Error fetching filtered data:', error));
      }
  
      // Add event listeners
      genreSelect.addEventListener('change', applyFilters);
      yearInput.addEventListener('input', applyFilters);
      ratingSelect.addEventListener('change', applyFilters);
  
      // Call applyFilters initially
      applyFilters();
    })
    .catch(error => console.error('Error fetching data:', error));
  