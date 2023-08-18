const searchInput = document.querySelector('.search-bar');
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const searchInput = yearInput.value;
        //Call function
    }
});

const yearInput = document.querySelector('.year-bar');
yearInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const storedYear = yearInput.value;
        if(storedYear>=1990 && storedYear<=2023){
            //Call function
        }
    }
});


const genreInput = document.querySelector('.genre-box');
genreInput.addEventListener('change', ()=>{
    const genre = genreInput.value; 
    //Call function
});


const ratingInput = document.querySelector('.rating-box');
ratingInput.addEventListener('change', ()=>{
    const rating = ratingInput.value; 
    //Call function (the value of rating is either Highest or Lowest)
});