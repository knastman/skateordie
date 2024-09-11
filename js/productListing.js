import { products, wishlist } from "./database/query.js";
import { getAllProducts } from "./database/query.js";


const categoryId = localStorage.getItem('CategoryId');

const savedCategoryId = products.getAllFromCategory(categoryId)
const allProducts = savedCategoryId || getAllProducts();

const productList = document.querySelector("#productList");


function listAllProducts() {
    const wishlistItems = wishlist.get()
    console.log(wishlistItems)

    allProducts.forEach((product) => {
        if (product.images && product.images.length > 0) {

            const productCard = document.createElement("div");
            productCard.classList.add('productCard');
            productList.append(productCard);


            const productCardImg = document.createElement('img');
            productCardImg.src = product.images[0];


            const wishlistButton = document.createElement("div");
            wishlistButton.classList.add('wishlist-icon')
            if (wishlistItems.find(i => i.id == product.id)) {
                wishlistButton.innerHTML = `<i class="fa-solid fa-heart fa-lg"></i>`
            } else {
                wishlistButton.innerHTML = `<i class="fa-regular fa-heart fa-lg"></i>`

            }









            const productCardText = document.createElement('p');
            productCardText.classList.add('productCardText');
            productCard.append(wishlistButton, productCardImg, productCardText);


            const shareContainer = document.createElement('div');
            shareContainer.classList.add('shareContainer');


            productCard.append(wishlistButton, productCardImg, productCardText, shareContainer);

            shareContainer.innerHTML = `
            <div class="shareContent">
                <div class="shareBox"> 
                    <span class="material-symbols-outlined">
                        share
                    </span>
                    <div style="margin-left: 5px; font-size: 12px;"> Share </div> 
                    <button class="dropDown"> <i class="fa-regular fa-copy copy-icon"></i> Copy link</button> 
                </div>
            </div>`;

            productCardText.innerHTML = `
            <p>${product.name}</p>
            <p>${product.priceSEK + " SEK"}</p>
                `;

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
                    window.location.href = `${window.location.origin}/produktsida.html?id=${product.id}`;
                }
                if (event.target.closest(".wishlist-icon")) {
                    const itemIsInWishlist = wishlist.toggle(product.id);
                    if (itemIsInWishlist) {
                        wishlistButton.innerHTML = `<i class="fa-solid fa-heart fa-lg" ></i>`;
                    } else {
                        wishlistButton.innerHTML = `<i class="fa-regular fa-heart fa-lg" ></i>`;

                    }
                }
            })
        };
    });
}
listAllProducts();









