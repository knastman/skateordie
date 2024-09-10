import { products } from './query.js'; 

const searchInput = document.getElementById('product-search');
const productGrid = document.getElementById('product-grid');

// display products
function displayProducts(productsArray) {
    productGrid.innerHTML = ''; // Clear previous products

    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');

        const productImg = document.createElement('img');
        productImg.src = product.images[0]; 
        productImg.alt = product.name;

        const productName = document.createElement('p');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.priceSEK} SEK`;

        productCard.appendChild(productImg);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);

        productGrid.appendChild(productCard);
    });
}

// filter 
function filterProductsByName(query) {
    const lowerCaseQuery = query.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(lowerCaseQuery)
    );
    displayProducts(filteredProducts);
}

// Event listener search
searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value;
    if (searchValue.length > 2) {  
        filterProductsByName(searchValue);
    } else {
        productGrid.innerHTML = ''; 
    }
});
