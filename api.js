const API_KEY = 'api_key=774c45332d4ea2aafdb9848019af87e5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

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
width = width/320;
width = Math.floor(width);
console.log(width);

// Fetch data from the API
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;

      for(let i=0;i<width;i++){
        const card = document.createElement('div');
        card.classList.add('card');

        const movieImage = document.createElement('img');
        movieImage.src =IMG_URL+ movies[i].poster_path;
        movieImage.alt = movies[i].title + ' Poster';
        card.appendChild(movieImage);

        popularMoviesSection.appendChild(card);
      }


  })
  .catch(error => console.error('Error fetching data:', error));