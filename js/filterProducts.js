import { getAllProducts } from "./database/query.js";

export function filterProducts(){

  const formEl = document.querySelector('.search-field');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  // Hämta användarens inmatning
  const inputValue = document.querySelector('#search-input').value.toLowerCase();
  console.log("Söksträng:", inputValue);

  // Hämta alla produkter först
  const allProducts = getAllProducts(); 
  
  // Filtrera produkter baserat på inmatningen
  const filteredProducts = filterByProducts(inputValue, allProducts);
  console.log("Filtrerade produkter:", filteredProducts);

  // Visa alla filtrerade produkter i konsolen om där finns några
  if(filteredProducts.length > 0){
    filteredProducts.forEach((product) => {
      console.log("Produktobjekt:", product);
  
    });
  }
  else {
    console.log('Inga produkter hittades');
  }
  formEl.reset();

});

// Funktion för att filtrera produkter baserat på söksträng
function filterByProducts(inputValue, products) {
  return products.filter(product => {
    return product.name.toLowerCase().includes(inputValue);
  });
}

}

