import { wishlist } from "./database/query.js"
import products from './database/products.js'; 

document.addEventListener('DOMContentLoaded', () => {
    displayWishlist();
});

export function displayWishlist() {
    const wishlistWrapper = document.getElementById('wishlist-wrapper');
    wishlistWrapper.innerHTML = '';

    const wishlistProducts = wishlist.get();
    console.log('Wishlist products:', wishlistProducts);

    if (wishlistProducts.length === 0) {
        wishlistWrapper.innerHTML = '<p>Your wishlist is empty..</p>';
        return;
    }

    wishlistProducts.forEach((product) => {
        const productData = products.find(p => p.id == product.id);

        if (productData) {
            const productCard = document.createElement('div');
            productCard.className = 'wishlist-productcard';
        
            productCard.innerHTML = `
                <div class="wishlist-image">
                    <img src="${productData.images[0]}" alt="${productData.name}"/>
                </div>
                <div class="wishlist-info">
                    <div class="wishlist-name-prize">
                    <h3 class="wishlist-productname">${productData.name}</h3>
                    <h3 class="wishlist-prize">${productData.priceSEK}</h3>
                </div>
                <div class="wishlist-options">
                    <button class="wishlist-unlike" data-id="${productData.id}">X</button>
                    <select name="size" id="wishlist-productsize">
                        <option value="size">SIZE</option>
                        <option value="onesize">ONESIZE</option>
                    </select>
                    <div class="wishlist-add-basket" id="${productData.id}">
                      <button class="add-to-cart wishlist-cart-button">Add to Cart</button>
                    </div>
                </div>
                </div>
            `;
            wishlistWrapper.appendChild(productCard);

            productCard.querySelector('.wishlist-unlike').addEventListener('click', () => {
                wishlist.toggle(product.id);
                displayWishlist();
            });
        }
    });
}
