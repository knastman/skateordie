import { getAllProducts } from "./database/query.js";

export function filterProducts() {
  const formEl = document.querySelector('.search-field');

  formEl.addEventListener('submit', event => {
    event.preventDefault();
    const inputValue = document.querySelector('#search-input').value.toLowerCase();

    localStorage.setItem('searchInput', inputValue);

    window.location.href = `${window.location.origin}/searchProduct.html`;
  });
}

if (window.location.href.includes('/searchProduct.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    const inputValue = localStorage.getItem('searchInput');
    const searchValue = document.querySelector('#searchResults');

    if (searchValue) {
      searchValue.innerText = `Search result: "${inputValue}"`;
    }

    if (inputValue) {
      const allProducts = getAllProducts(); 
      const filteredProducts = filterByProducts(inputValue, allProducts);
      displayFilteredProducts(filteredProducts); 
    }
  });

  function filterByProducts(inputValue, products) {
    return products.filter(product => {
      return product.name.toLowerCase().includes(inputValue);
    });
  }

  function displayFilteredProducts(filteredProducts) {
    const searchProducts = document.querySelector('#searchProduct');
    searchProducts.innerHTML = ''; 

    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        console.log("Produktobjekt:", product);

        const productCard = document.createElement("div");
        productCard.classList.add('productCard');
        searchProducts.append(productCard);

        const productCardImg = document.createElement('img');
        productCardImg.src = product.images[0];
        productCardImg.classList.add("productCardImg")

        const shareContainer = document.createElement('div');
        shareContainer.classList.add('shareContainer');

        const productCardText = document.createElement('p');
        productCardText.classList.add('productCardText');
        productCard.append(productCardImg, productCardText, shareContainer);

        shareContainer.innerHTML = `
          <div class="shareContent">
              <div class="shareBox"> 
                  <span class="material-symbols-outlined">share</span>
                  <div style="margin-left: 5px; font-size: 12px;"> Share </div> 
                  <button class="dropDownBtn" data-product-id="${product.id}"> 
                  <i class="fa-regular fa-copy copy-icon"></i> Copy link
                  </button>  
              </div>
          </div>`;

        productCardText.innerHTML = `
          <p>${product.name}</p>
          <p>${product.priceSEK + " SEK"}</p>
        `;

        const dropDown = document.querySelectorAll('.dropDownBtn');
        dropDown.forEach((dropDownBtn) => {
          dropDownBtn.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            const productId = dropDownBtn.getAttribute('data-product-id');
            copyUrl(productId);  
          });
        });

        productCard.addEventListener('mouseover', () => {
          productCardImg.src = product.images[1];
        });
        productCard.addEventListener('mouseout', () => {
          productCardImg.src = product.images[0];
        });
      });
    } else {
      console.log('Inga produkter hittades');
    }
  }
}


