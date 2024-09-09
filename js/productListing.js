import { products } from "./database/query.js";
import { getAllProducts } from "./database/query.js";

const categoryId = localStorage.getItem('CategoryId');

const savedCategoryId = products.getAllFromCategory(categoryId)
const allProducts = savedCategoryId || getAllProducts();

const productList = document.querySelector("#productList");


function listAllProducts() {

    allProducts.forEach((product) => {
        if (product.images && product.images.length > 0) {

            const productCard = document.createElement("div");
            productCard.classList.add('productCard');
            productList.append(productCard);

            const productCardImg = document.createElement('img');
            productCardImg.src = product.images[0];


            const productCardText = document.createElement('p');
            productCardText.classList.add('productCardText');
            productCard.append(productCardImg, productCardText);


            productCardText.innerHTML = `
            <p>${product.name}</p>
            <p>${product.priceSEK + " SEK"}</p>`;

            productCard.addEventListener('mouseover', () => {
                productCardImg.src = product.images[1];
            })
            productCard.addEventListener('mouseout', () => {
                productCardImg.src = product.images[0];
            })

            // CHOOSING A PRODUCT AND BEING SENT TO THE PRODUCTPAGE

            productCard.addEventListener('click', () => {
                window.location.href = `${window.location.origin}/produktsida.html?id=${product.id}`;
            })
        };
    });
}
listAllProducts();









