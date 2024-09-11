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

            
            const shareContainer = document.createElement('div');
            shareContainer.classList.add('shareContainer');

            const productCardText = document.createElement('p');
            productCardText.classList.add('productCardText');
            productCard.append(productCardImg, productCardText, shareContainer);

            shareContainer.innerHTML = `
            <div class="shareContent">
                <div class="shareBox"> 
                    <span class="material-symbols-outlined">
                        share
                    </span>
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

function copyUrl(productId) {
    const productUrl = `${window.location.origin}/produktsida.html?id=${productId}`;
    
    navigator.clipboard.writeText(productUrl).then(() => {
        alert("Link successfully copied!");
    })
}









