import { products } from "../database/query.js";
import RemoveButton from "./RemoveButton.js";

// apperance of basket items
export function createBasketItem(item) {
  
  // --- Cannot be changed without breaking functionality
  const productInfo = products.getById(item.product_id);
  const card = document.createElement("div");
  card.classList.add("basketCard") 
  card.id = item.id;
  // -----------------------------------------------------

  // **** CUSTOMIZABLES
  // customize card appearance freely
  card.innerHTML = `
    <img src="${productInfo.images[0]}" id="basketImage"/>
    <div class="basketInfo"
      <p>${productInfo.name}</p>
      <p>price: ${productInfo.priceSEK}kr</p>
    </div>
  `;

  // must exist but can be appended elsewhere within basketCard
  card.append(new RemoveButton()) 

  // *****************************************************

  return card;
}