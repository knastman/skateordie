import { products } from "./database/query.js";
// Displays slides on frontpage 

async function displaySlide() {
  const slideContainers = document.querySelectorAll(".slides"); 
  const newProducts = products.getAll(); 

  newProducts.forEach((newProducts, index) => {
    if (newProducts.images && newProducts.images.length > 0) { 
      const slideImg = document.createElement('img'); 
      slideImg.style.width = "100%"
      slideImg.src = newProducts.images[0]; 
      slideContainers[index].appendChild(slideImg); 
      slideContainers[index].querySelector(".text p").textContent = newProducts.name
        
      slideImg.addEventListener("click", () => {
        localStorage.setItem('allProducts', newProducts.id)
        localStorage.setItem('allproducts', newProducts.category_id)
        window.location.href = `${window.location.origin}/produktsida.html`
      })
    }
  });
}

let slideIndex = 1;
showSlides(slideIndex);

function setupSlideNavigation() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            plusSlides(-1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            plusSlides(1);
        });
    }

    if (dots.length > 0) {
        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                let slideNumber = parseInt(this.getAttribute('data-slide'));
                currentSlide(slideNumber);
            });
        });
    }
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

if (document.querySelector('.slides')) {
    setupSlideNavigation();
}


export {displaySlide}