import { basket } from "../database/query.js";
import { createBasketItem } from "./createBasketItem.js";

export function updateBasketInfo() {
  const basketInfo = basket.getInfo();

  const basketWrapperDOM = document.querySelector("#basketWrapper");
  const basketLengthDOM = document.querySelector("#basketLength");
  const basketTotalDOM = document.querySelector("#basketTotal");  

  basketLengthDOM.textContent = basketInfo.length;
  basketTotalDOM.textContent = basketInfo.totalSEK;

  basketWrapperDOM.innerHTML = "";

  basketInfo.items.forEach(i => {
    basketWrapperDOM.append(createBasketItem(i));
  });
  
}