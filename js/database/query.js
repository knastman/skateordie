import categoriesDB from "./categories.js";
import productsDB from "./products.js";

// module exports functions to read and manipulate database.
// import 'products' and/or 'categories' to module and use respective methods

// EXPORTS
export const products = {
  getAll: getAllProds,
  getById: getProdById,
};

export const categories = {
  getAll: getCats,
  getNameById: getCatNameFromId,
  getProductCats: getProductCats
};

// PRODUCT QUERIES
function getAllProds() {
  const products = productsDB;

  return products.map((prod) => formatProd(prod));
}

function getProdById(id) {
  const product = productsDB.find((i) => i.id == id);

  return formatProd(product);
}

// CATEGORY QUERIES
function getCatNameFromId(id) {
  return categoriesDB.find((cat) => cat.id == id).name;
}

// get all categories with subcats nested
function getCats() {
  const categories = getNestedCats();

  const topLevelCats = categories.filter((cat) => cat.parent_id == null);

  return topLevelCats;
}

// all bottom level cats that store products
function getProductCats() {
  const categories = getNestedCats();

  const bottomLevelCats = categories.filter(cat => cat.subcats.length == 0);
  
  return bottomLevelCats
}

function getNestedCats() {
  // code from chatGPT
  const categories = categoriesDB;
  const catMap = {};

  // Create a map of categories by id
  categories.forEach((category) => {
    category.subcats = [];
    category.path = category.name;
    catMap[category.id] = category;

  });

  // Add each category to its parent's subcategories array
  categories.forEach((category) => {
    if (category.parent_id !== null) {
      const parentCat = catMap[category.parent_id];
      category.path = `${parentCat.path}/${category.name}`;
      parentCat.subcats.push(category);
    }
  });

  return categories;
}

// FOR PROGRAMMER CONVENIENCE
function formatProd(product) {
  let newProduct = product;

  newProduct.category = getCatNameFromId(product.category_id);

  return newProduct;
}
