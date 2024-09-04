import { categories } from "./database/query.js";

/*********************************
  Display product navigation
**********************************/

export function displayCategories(){
  const mainLevelUl = document.querySelector('#main-level'); //Första nivån
  
  //Get all categories from db
  const allCategories = categories.getAll();
  console.log(allCategories);
  

  //Create nav with categories
  for(const category of allCategories){
    const categoryName = category.name;
    const categoryLi = document.createElement('li');
    const ul = document.createElement('ul'); 
    const a = document.createElement('a'); 
    const urlBase = "/products/"; //Vet inte om det är så vi ska ha strukturen, lätt att ändra iaf.
    const urlPath = urlBase + category.path; 
    const linkText = document.createTextNode(categoryName);
    a.href = urlPath;

    //Create subcategories (level 2)
    const subcategories = category.subcats;
    for (const subcat of subcategories) {      
      const subCatName = subcat.name;
      const subCategoryLi = document.createElement('li');
      const a = document.createElement('a'); 
      const urlPath = urlBase + subcat.path; 
      console.log(urlPath);
      
      const sublinkText = document.createTextNode(subCatName);
      a.href = urlPath;

      ul.append(subCategoryLi);
      subCategoryLi.appendChild(a);
      a.appendChild(sublinkText);
    }
  
    mainLevelUl.append(categoryLi);
    categoryLi.appendChild(a);
    a.appendChild(linkText);

    if (category.subcats && category.subcats.length > 0) {
      categoryLi.append(ul);
    }
  }
}