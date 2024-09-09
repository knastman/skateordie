import { products} from "./database/query.js";
import { displayCategories } from "./displayNav.js";
import "./basket/init.js"
import { filterProducts } from "./filterProducts.js";
import categories from "./database/categories.js";

// products.getAll(), products.getById()
// categories.getAll(), categories.getNameById()

//Bygger menyn dynamiskt/hämtar categorier databasen
displayCategories();

filterProducts();

