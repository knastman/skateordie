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

            const wishlistButton = document.createElement("button");
            wishlistButton.classList.add('wishlist-icon')
            // wishlistButton.innerHTML = `<i class="fa-regular fa-heart fa-lg" class="wishlist-icon"></i>`
            wishlistButton.innerHTML = `<i class="fa-solid fa-heart fa-lg" class="wishlist-icon"></i>`



            const productCardText = document.createElement('p');
            productCardText.classList.add('productCardText');
            productCard.append(wishlistButton, productCardImg, productCardText);



            productCardText.innerHTML = `
            <p>${product.name}</p>
            <p>${product.priceSEK + " SEK"}</p>`;

            productCard.addEventListener('mouseover', (event) => {
                if (event.target == productCardImg) {
                    productCardImg.src = product.images[1];
                }
            })
            productCard.addEventListener('mouseout', () => {
                productCardImg.src = product.images[0];
            })

            // wishlistButton.addEventListener('mouseover', () => {
            //     wishlistButton.innerHTML = `<i class="fa-solid fa-heart" class="wishlist-icon"></i>`
            // })

            // wishlistButton.addEventListener('mouseout', () => {
            //     wishlistButton.innerHTML = `<i class="fa-regular fa-heart" class="wishlist-icon"></i>`
            // })

            // CHOOSING A PRODUCT AND BEING SENT TO THE PRODUCTPAGE

            productCard.addEventListener('click', (event) => {
                if (event.target == productCardImg) {
                    console.log("product id is " + product.id)
                    console.log("The product category id is " + product.category_id)

                    localStorage.setItem('allProducts', product.id)
                    localStorage.setItem('allproducts', product.category_id)
                    window.location.href = `${window.location.origin}/produktsida.html`;
                }
                if (event.target.closest(".wishlist-icon")) {
                    console.log("test")
                }

            })
        };
    });
}
listAllProducts();









