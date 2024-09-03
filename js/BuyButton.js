import { basket, products } from "./database/query.js";

export default class BuyButton{
  constructor() {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "buy";
    button.classList.add("buy-item")

    return button;
  }
}

// apperance of basket items
function createBasketItem(item) {
  const productInfo = products.getById(item.product_id);

  const card = document.createElement("div");
  card.classList.add("basketCard")
  card.id = item.id;

  card.innerHTML = `
    <p>${productInfo.name}</p>
    <p>price: ${productInfo.priceSEK}kr</p>
  `;

  card.append(new RemoveButton())

  return card;
}

class RemoveButton{
  constructor(){
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "remove";
    button.classList.add("remove-item")

    return button;
  }
}

function updateBasketInfo() {
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

// INITS

// initalize basket
if (document.querySelector("#basket")) {
  updateBasketInfo();
}

// initialize buttons 
document.addEventListener("click", (e) => {
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