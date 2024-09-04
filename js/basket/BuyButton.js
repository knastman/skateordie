
export default class BuyButton{
  constructor() {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "buy";
    button.classList.add("buy-item")

    return button;
  }
}



