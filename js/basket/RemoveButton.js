
export default class RemoveButton {
  constructor(){
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "remove";
    button.classList.add("remove-item")
    button.style.height = '30px'

    return button;
  }
}
