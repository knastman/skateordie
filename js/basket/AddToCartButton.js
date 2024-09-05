
export default class AddToCartButton{
  constructor() {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add to Cart";
    button.classList.add("add-to-cart")

    return button;
  }
}



