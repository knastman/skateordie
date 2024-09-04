import { basket, products } from "../database/query.js";
import { updateBasketInfo } from "./updateBasketInfo.js";


// initalize basket
if (document.querySelector("#basket")) {
  updateBasketInfo();
}

// initialize buttons 
document.addEventListener("click", (e) => {
  // BUYBUTTON FUNCTIONALITY
  if (e.target.classList.contains("buy-item")) {
    //identify item
    const item = e.target.closest(".productCard");

    // add item to basket
    basket.add(item.id);

    console.log("items in basket:", basket.get());

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