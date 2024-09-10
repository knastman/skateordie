import categoriesDB from "./categories.js";
import productsDB from "./products.js";

// module exports functions to read and manipulate database.
// import 'products' and/or 'categories' to module and use respective methods

// EXPORTS
export const products = {
  getAll: getAllProds,
  getById: getProdById,
  getAllFromCategory: getProdByCat
};

export const categories = {
  getAll: getCats,
  getNameById: getCatNameFromId,
  getProductCats: getProductCats,
  add: addNewCat
};

export const basket = {
  add: addToBasket,
  remove: removeFromBasket,
  get: getBasket,
  getInfo: getBasketInfo
}

export const wishlist = {
  toggle: toggleWishlist,
  get: getWishlist
}

// PRODUCT QUERIES
function getAllProds() {
  const adminProducts = JSON.parse(sessionStorage.getItem('products')) || [];
  const products = [...productsDB, ...adminProducts];
  console.log(products)

  return products.map((prod) => formatProd(prod));
}

function getProdById(id) {
  const product = productsDB.find((i) => i.id == id);

  return formatProd(product);
}

function getProdByCat(id) {
  const products = getAllProds();
  return products.filter(p => p.category_id == Number(id) )
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
  const categories = allCats();

  // code from chatGPT
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

function addNewCat(userCat) {
  // get highest id
  const allCatIds = allCats().map(c => c.id);
  const highestId = Math.max(...allCatIds);

  // add id to newCat
  const newCat = {
    id: highestId + 1,
    ...userCat
  }

  // add to session storage
  // POTENTIAL TODO: replace with firebase comms

  // get previously added categories
  let prevCats = JSON.parse(sessionStorage.getItem("categories")) || [];

  prevCats.push(newCat);
  
  sessionStorage.setItem("categories", JSON.stringify(prevCats));

}

// all user and pre added cats
function allCats() {
  const adminCategories = JSON.parse(sessionStorage.getItem('categories')) || [];
  const categories = [...categoriesDB, ...adminCategories];

  // console.log(adminCategories)

  return categories
}


// Functionality for adding products

function allStoredProducts() {
  return JSON.parse(sessionStorage.getItem("products")) || [];
}

// Funktion för att hämta alla produkter, både från databasen och sessionStorage
export function getAllProducts() {
  const dbProducts = products.getAll(); 

  // Hämta produkter från sessionStorage
  const storedProducts = allStoredProducts();

  // Sammanfoga de två listorna
  const allProducts = [...dbProducts, ...storedProducts];

  return allProducts;
}

export function addNewProduct(userProduct) {
  const allProducts = getAllProducts(); 
  const highestId = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) : 0;

  // Lägg till ett nytt unikt ID till den nya produkten
  const newProduct = {
    id: highestId + 1, 
    ...userProduct 
  };

  const updatedProducts = [...allStoredProducts(), newProduct];
  sessionStorage.setItem("products", JSON.stringify(updatedProducts));
}

// BASKET
function addToBasket(product_id) {

  // get previous basket
  const basket = JSON.parse(sessionStorage.getItem('basket')) || [];

  // add new item

  basket.push({
    id: getUniqueId(basket),
    product_id: Number(product_id)
  });

  // update basket
  sessionStorage.setItem('basket', JSON.stringify(basket));
}


function removeFromBasket(id) {
  // get previous basket
  const basket = JSON.parse(sessionStorage.getItem('basket')) || [];

  console.log(id, basket)
  
  const updatedBasket = basket.filter(i => i.id !== Number(id));
  
  console.log(id, updatedBasket);

  //update basket
  sessionStorage.setItem('basket', JSON.stringify(updatedBasket));

}

function getBasket() {
  // get previous basket
  const basket = JSON.parse(sessionStorage.getItem('basket')) || [];

  return basket;
  
}

function getBasketInfo() {
  const basket = JSON.parse(sessionStorage.getItem('basket')) || [];

  const basketProducts = basket.map(i => getProdById(i.product_id));

  const total = basketProducts.map(i => i.priceSEK).reduce((t, c) => t + c, 0);

  const basketInfo = {
    items: basket,
    length: basket.length,
    totalSEK: total
  }

  return basketInfo;
}

// WISHLIST
function toggleWishlist(product_id) {
  const wishlist = getWishlist();

  if (wishlist.includes(product_id)) {
    removeFromWishlist(product_id);
    return false;

  } else {
    addToWishlist(product_id)
    return true;
  }

}

function addToWishlist(product_id) {
  const wishlist = getWishlist();

  wishlist.push(Number(product_id))

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function removeFromWishlist(product_id) {
  const wishlist = getWishlist();

  const updatedWishlist = wishlist.filter(i => i !== Number(product_id));

  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
}

function getWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  return wishlist
}

// FOR PROGRAMMER CONVENIENCE
function formatProd(product) {
  let newProduct = product;

  newProduct.category = getCatNameFromId(product.category_id);

  return newProduct;
}

// array must be array of items where each item has key 'id'
// returns a unique new id for array
function getUniqueId(array) {
  const ids = array.map(i => i.id);

  const prevHighestId = ids.length > 0 ? Math.max(...ids) : 0;

  const uniqueId = prevHighestId + 1;

  return uniqueId;
}