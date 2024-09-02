import {fetchProducts} from './script.js'

// Displays slides on frontpage 

async function displaySlide() {
  const slideContainers = document.querySelectorAll(".slides"); 
  const products = await fetchProducts(); 

  products.forEach((product, index) => {
    if (product.images && product.images.length > 0) { 
      const slideImg = document.createElement('img'); 
      slideImg.style.width = "100%"
      slideImg.src = product.images[0]; 
      slideContainers[index].appendChild(slideImg); 
    }
  });
}

let slideIndex = 1;
showSlides(slideIndex);

document.querySelector('.prev').addEventListener('click', function() {
    plusSlides(-1);
});

document.querySelector('.next').addEventListener('click', function() {
    plusSlides(1);
});

document.querySelectorAll('.dot').forEach(function(dot) {
    dot.addEventListener('click', function() {
        let slideNumber = parseInt(this.getAttribute('data-slide'));
        currentSlide(slideNumber);
    });
});

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

export {displaySlide, showSlides}