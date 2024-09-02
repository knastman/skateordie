import { products, categories } from "./database/query.js";

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

