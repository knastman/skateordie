import { products } from "./database/query.js";
import { displaySlide } from "./displaySlide.js";
import { displayCategories } from "./displayNav.js";
// products.getAll(), products.getById()
// categories.getAll(), categories.getNameById()

// Displays slider with new products, frontpage.

displaySlide();

//Bygger menyn dynamiskt/hämtar categorier databasen
displayCategories();