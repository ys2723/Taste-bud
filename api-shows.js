const API_KEY = 'api_key=774c45332d4ea2aafdb9848019af87e5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY; // Changed to TV shows
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/tv?' + API_KEY; // Changed to TV shows



// Fetch data from the API for TV shows
const image1 = document.querySelector('.image-1');
const image2 = document.querySelector('.image-2');
const image3 = document.querySelector('.image-3');
const image4 = document.querySelector('.image-4');


//Dynamically generating the amount of cards based on the screen width
const popularShowsSection = document.getElementById('popular-Shows');
let width = popularShowsSection.getBoundingClientRect().width;
width = width/320;
width = Math.floor(width);


//Fetching the inputs for year, genre and rating
const submitButton = document.querySelector('.submit');
const genreInput = document.querySelector('.genre-box');
const yearInput = document.querySelector('.year-bar');
const ratingInput = document.querySelector('.rating-box')
submitButton.addEventListener('click', () => {
  let year = '';
  let rating = '';
  let genre = '';

  if (yearInput.value) {
    year = yearInput.value;
  }
  if (ratingInput.value) {
    if(rating.value == "Highest"){
      API_URL = BASE_URL + '/discover/tv?sort_by=vote_average.desc&' + API_KEY;
    }
  }
  if (genreInput.value) {
    genre = genreInput.value;
  }

  fetchShowsWithParams(year,rating,genre);

  //Resetting the inputs after submit 
  genreInput.selectedIndex = 0;
  ratingInput.selectedIndex = 0;
  yearInput.value = '';
  
});


//Fetching the input for a search
const searchInput = document.querySelector('.search-bar');
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const searchInput = yearInput.value;
        //Call function
    }
});


function fetchsShowsWithParams(year, rating, genre) {
  let url = API_URL;

  if (year) {
    url += `&primary_release_year=${year}`;
  }
  if (rating === 'Highest') {
    url += '&sort_by=vote_average.desc';
  } else if (rating === 'Lowest') {
    url += '&sort_by=vote_average.asc';
  }
  if (genre) {
    url += `&with_genres=${genre}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const Shows = data.results;
      console.log(Shows);
      image1.src = IMG_URL+ Shows[1].backdrop_path;
      image2.src = IMG_URL+Shows[2].backdrop_path;
      image3.src = IMG_URL+Shows[3].backdrop_path;
      image4.src = IMG_URL+Shows[4].backdrop_path;
      
    })
    .catch(error => console.error('Error fetching data:', error));
}



// Fetch data from the API
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log(API_URL);
    const Shows = data.results;

      //Functionality for generating top weekly
      for(let i=0;i<width;i++){
        const card = document.createElement('div');
        card.classList.add('card');

        const ShowsImage = document.createElement('img');
        ShowsImage.src =IMG_URL+ Shows[i].poster_path;
        ShowsImage.alt = Shows[i].title + ' Poster';
        card.appendChild(ShowsImage);

        popularShowsSection.appendChild(card);
      }

  })
  .catch(error => console.error('Error fetching data:', error));
