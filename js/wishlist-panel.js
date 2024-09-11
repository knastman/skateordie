import { displayWishlist } from './wishlist-display.js';

document.addEventListener('DOMContentLoaded', () => {
    const wishlistIcon = document.querySelector('.wishlist-icon-header');
    const wishlistPanel = document.getElementById('wishlist-panel');
    const closeWishlistBtn = document.getElementById('close-wishlist-panel');

    function toggleWishlistPanel() {
        wishlistPanel.classList.toggle('show'); 
        if (wishlistPanel.classList.contains('show')) {
            displayWishlist(); 
        }
    }

    wishlistIcon.addEventListener('click', toggleWishlistPanel);
    closeWishlistBtn.addEventListener('click', toggleWishlistPanel);
});
