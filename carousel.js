const indicators = document.querySelectorAll(".carousel-indicator");
const slides = document.querySelector("[data-slides]");
const buttons = document.querySelectorAll("[data-carousel-button]");

let currentIndex = 0;
let autoSlideInterval = setInterval(autoChangeSlide, 5000);

// Add this function to update the active indicator
function updateActiveIndicator(index) {
  indicators.forEach(indicator => {
    indicator.classList.remove("active");
  });
  indicators[index].classList.add("active");
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    slides.querySelector("[data-active]").removeAttribute("data-active");
    slides.children[index].setAttribute("data-active", "");

    updateActiveIndicator(index);

    // Reset the auto slide interval
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoChangeSlide, 5000);

    currentIndex = index; // Update the currentIndex with the user's choice
  });
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    slides.querySelector("[data-active]").removeAttribute("data-active");
    currentIndex = (currentIndex + offset + slides.children.length) % slides.children.length;
    slides.children[currentIndex].setAttribute("data-active", "");

    updateActiveIndicator(currentIndex);

    // Reset the auto slide interval
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoChangeSlide, 5000);
  });
});

function autoChangeSlide() {
  currentIndex = (currentIndex + 1) % slides.children.length;

  slides.querySelector("[data-active]").removeAttribute("data-active");
  slides.children[currentIndex].setAttribute("data-active", "");

  updateActiveIndicator(currentIndex);

  // Reset the auto slide interval
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoChangeSlide, 5000);
}