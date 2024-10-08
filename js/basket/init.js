import { basket, products } from "../database/query.js";
import { updateBasketInfo } from "./updateBasketInfo.js";


// initalize basket
if (document.querySelector("#basket")) {
  updateBasketInfo();
}

// initialize buttons 
document.addEventListener("click", (e) => {
  // BUYBUTTON FUNCTIONALITY
  if (e.target.classList.contains("add-to-cart")) {
    //identify item
    const item = e.target.closest(".productCard") || e.target.closest(".product-page") || e.target.closest(".wishlist-add-basket");

    // add item to basket
    basket.add(item.id);

    alert(`Added product to basket!`);


    if (document.querySelector("#basket")) {
      updateBasketInfo();
    }
  }

  // REMOVEBUTTON FUNCTIONALITY
  if (e.target.classList.contains("remove-item")) {
    //identify item
    const item = e.target.closest(".basketCard");

    // remove item from list
    basket.remove(item.id);

    if (document.querySelector("#basket")) {
      updateBasketInfo();
    }
  }
    
})