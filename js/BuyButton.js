import { basket } from "./database/query.js";

export default class BuyButton{
  constructor() {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "buy";
    button.classList.add("buy-item")

    return button;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-item")) {
    //identify item
    const item = e.target.closest(".productCard");

    // add item to basket
    basket.add(item.id);

    console.log("items in basket:", basket.get());
  }
    
})
