function sortMovies(movies, sortBy) {
    switch (sortBy) {
      case 'rating':
        return movies.slice().sort((a, b) => b.vote_average - a.vote_average);
        
      case 'genre':
        return movies.slice().sort((a, b) => a.genre_ids[0] - b.genre_ids[0] || b.vote_average - a.vote_average);
        
      case 'year':
        return movies.slice().sort((a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear() || b.vote_average - a.vote_average);
  
      default:
        return movies;
    }
  }
  
  // Export the sorting function
  export { sortMovies };