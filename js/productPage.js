import { products } from "./database/query.js";

// Product chosen from productListing.js is saved in localStorage shown on productPage.js
const chosenProductID = localStorage.getItem('allProducts');
const chosenProductCatID = localStorage.getItem('allproducts');

console.log("product id is " + chosenProductID)
console.log("The product category id is " + chosenProductCatID)


// Fetch product data by ID or index
const productId = chosenProductID; // Example, this would be dynamic based on the page or URL
const product = products.getById(productId);

const productWrapper = document.querySelector(".product-page")
const mainImage = document.getElementById("main-image");
const thumbnails = document.getElementById("thumbnail-row");
const productTitle = document.getElementById("product-title");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const showMoreText = document.getElementById("show-more-text");
const sizeSelect = document.getElementById("size");

productWrapper.id = product.id;

// Update product details
mainImage.src = product.images[0];
product.images.forEach((image, index) => {
  const thumbnail = document.createElement("img");
  thumbnail.src = image;
  thumbnail.alt = `Thumbnail ${index + 1}`;
  thumbnail.classList.add("thumbnail");
  thumbnail.addEventListener("click", () => {
    mainImage.src = image;
  });
  thumbnails.appendChild(thumbnail);
});

productTitle.textContent = product.name;
productPrice.textContent = `${product.priceSEK} SEK`;
productDescription.textContent = product.description.split("<span")[0]; // show first part of description
showMoreText.innerHTML = product.description.split("<span")[1] || ""; // show hidden part

// Populate sizes
product.sizes.forEach((size) => {
  const option = document.createElement("option");
  option.value = size;
  option.textContent = size;
  sizeSelect.appendChild(option);
});

// Show more funktion
const showMoreLink = document.getElementById("show-more");
showMoreLink.addEventListener("click", function () {
  if (showMoreText.classList.contains("hidden")) {
    showMoreText.classList.remove("hidden");
    showMoreLink.textContent = "Show less";
  } else {
    showMoreText.classList.add("hidden");
    showMoreLink.textContent = "Show more";
  }
});