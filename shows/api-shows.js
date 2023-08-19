const API_KEY = 'api_key=774c45332d4ea2aafdb9848019af87e5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY; // Changed to TV shows
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/tv?' + API_KEY; // Changed to TV shows


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

  fetchsShowsWithParams(year,rating,genre);

  //Resetting the inputs after submit 
  genreInput.selectedIndex = 0;
  ratingInput.selectedIndex = 0;
  yearInput.value = '';
  
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
      const shows = data.results;
      console.log(shows);
      for(let i = 1; i<6 ;i++){
        let img = document.querySelector('.image-'+i);
        img.src = IMG_URL+ shows[i].backdrop_path;

        let name = document.querySelector('.name-'+i);
        name.innerHTML = shows[i].name;

        let rating = document.querySelector('.rating-'+i);
        rating.innerHTML = shows[i].vote_average;

        let desc = document.querySelector('.desc-'+i);
        desc.innerHTML = shows[i].overview;
      }
      
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Fetching the input for a search
const searchInput = document.querySelector('.search-bar');
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const tvName = searchInput.value;
        searchTv(tvName);
        searchInput.value = "";
    }
});

function searchTv(tvName) {
    const searchURL = `${BASE_URL}/search/tv?${API_KEY}&query=${encodeURIComponent(tvName)}`;

    fetch(searchURL)
        .then(response => response.json())
        .then(data => {
            const tvShows = data.results;
            if (tvShows.length > 0) {
                const firstTvShow = tvShows[0];
                const genreIds = firstTvShow.genre_ids;
                recommendTvShowsByGenres(genreIds);
            } else {
                alert('No TV shows found with that name.');
            }
        })
        .catch(error => console.error('Error searching TV shows:', error));
}

function recommendTvShowsByGenres(genreIds) {
    // Use the genreIds to recommend TV shows by genre
    if (genreIds.length > 0) {
        const genreId = genreIds[0]; 

        const recommendURL = `${BASE_URL}/discover/tv?${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`;

        fetch(recommendURL)
            .then(response => response.json())
            .then(data => {
                const tvShows = data.results;
                for (let i = 1; i < 6; i++) {
                    let img = document.querySelector('.image-' + i);
                    img.src = IMG_URL + tvShows[i].backdrop_path;

                    let name = document.querySelector('.name-' + i);
                    name.innerHTML = tvShows[i].name; 

                    let rating = document.querySelector('.rating-' + i);
                    rating.innerHTML = tvShows[i].vote_average; 

                    let desc = document.querySelector('.desc-' + i);
                    desc.innerHTML = tvShows[i].overview; 
                }
            })
            .catch(error => console.error('Error recommending TV shows:', error));
    }
}



// Fetch data from the API
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
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


