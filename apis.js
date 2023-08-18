const apiConfig = {
    movies: {
        apiKey: "api_key=774c45332d4ea2aafdb9848019af87e5",
        BASE_URL: "https://api.themoviedb.org/3",
        API_URL: "",
    },
};

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });
}

const moviesAPIUrl = apiConfig.movies.BASE_URL + "/discover/movie?" + apiConfig.movies.apiKey;
getMovies(moviesAPIUrl);

export default apiConfig;

  