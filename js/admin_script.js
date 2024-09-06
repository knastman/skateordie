import { products, categories } from "./database/query.js";
import { addNewProduct } from "./database/query.js";
// add category page
if (document.querySelector("#parent_id")) {
  const optionsContainer = document.querySelector("#parent_id");
  const cats = categories.getAll();

  cats.forEach(cat => {
    // console.log(cat.name)
    const allCategories = processSubcategories(cat);

    allCategories.forEach(cat => {
      optionsContainer.append(createCategoryOption(cat));
    })
    
  })

  // submit button
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const newCat = Object.fromEntries(formData.entries());

    newCat.parent_id = Number(newCat.parent_id) || null;

    categories.add(newCat);

    window.location.reload();
  })

}

// add product page
if (document.querySelector("#category_id")) {
  const optionsContainer = document.querySelector("#category_id");
  const cats = categories.getAll();

  // get only categories with no sub categories
  const productCats = categories.getProductCats();

  productCats.forEach(cat => {
    optionsContainer.append(createCategoryOption(cat))
  })

  
}

function createCategoryOption(cat) {
  const option = document.createElement("option");
  option.value = cat.id;
  option.textContent = cat.path + "/";

  return option
}

function processSubcategories(category, path = '') {
  // code from chatGPT

  const currentPath = path ? `${path}/${category.name}` : category.name;

  // Set the path for the current category
  category.path = currentPath;

  // Start with the current category in the list
  let allCategories = [category];

  // If there are subcategories, process each one
  if (category.subcats && category.subcats.length > 0) {
    category.subcats.forEach(subcat => {
      // Merge the results of processing subcategories into allCategories
      allCategories = allCategories.concat(processSubcategories(subcat, currentPath));
    });
  }

  return allCategories;
}

const form = document.querySelector("form");
if(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const formData = new FormData(form);
    const imagesArray = formData.getAll('images[]').filter(url => url);
  
    const newProduct = {
      name: formData.get('name'),
      description: formData.get('description'),
      priceSEK: parseFloat(formData.get('priceSEK')), 
      category_id: Number(formData.get('category_id')),
      color: formData.get('color'),
      images: imagesArray.length === 1 ? imagesArray[0] : imagesArray
    };

    console.log(newProduct)
  
    addNewProduct(newProduct); 
  });
}


