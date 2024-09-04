
export default class RemoveButton {
  constructor(){
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "remove";
    button.classList.add("remove-item")

    return button;
  }
}
