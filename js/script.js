import { products } from "./database/query.js";
import { displaySlide } from "./displaySlide.js";
import { displayCategories } from "./displayNav.js";
// products.getAll(), products.getById()
// categories.getAll(), categories.getNameById()

//Get all products 
async function fetchProducts() {
  const allProducts = await products.getAll(); 
  return allProducts; 
}

fetchProducts().then(displaySlide());
export {fetchProducts}

//Bygger menyn dynamiskt/hämtar categorier databasen
displayCategories();