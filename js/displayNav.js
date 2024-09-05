import { categories } from "./database/query.js";

/*********************************
  Display product navigation
**********************************/

export function displayCategories() {
  const mainLevelUl = document.querySelector('#main-level'); //Första nivån

  //Get all categories from db
  const allCategories = categories.getAll();


  //Create nav with categories
  for (const category of allCategories) {
    const categoryName = category.name;  //Get category names
    const categoryLi = document.createElement('li');
    const ulL2 = document.createElement('ul'); //

    //Nav links level 1
    const linkText = document.createTextNode(categoryName);
    const a = document.createElement('a');
    a.href = "#"; //Om path ska användas

    //******** LEVEL 2 ************** 
    const subcategories = category.subcats; //Get subcategories
    for (const subcat of subcategories) {
      const subCatName = subcat.name;
      const subCategoryLi = document.createElement('li');

      //Nav links level 2
      const a = document.createElement('a');
      const sublinkText = document.createTextNode(subCatName);
      a.href = "#";

      //******** LEVEL 3 ************** 
      const ulL3 = document.createElement('ul');
      const subcategoriesL3 = subcat.subcats; //Get subcategories level 3

      for (const subcatL3 of subcategoriesL3) {
        const subCatNameL3 = subcatL3.name;
        const subCategoryLiL3 = document.createElement('li');

        //Nav links lev 3
        const sublinkTextL3 = document.createTextNode(subCatNameL3);
        const a = document.createElement('a');


        //Appending level 3
        ulL3.append(subCategoryLiL3);
        subCategoryLiL3.appendChild(a);
        a.appendChild(sublinkTextL3);

        a.addEventListener('click', () => {
          console.log(subcatL3.id)
          localStorage.setItem('CategoryId', subcatL3.id)
          window.location.href = `${window.location.origin}/produktkort.html`

        })
      }


      //Appending level 2
      ulL2.append(subCategoryLi);
      subCategoryLi.appendChild(a);
      a.appendChild(sublinkText);

      if (subcat.subcats && subcat.subcats.length > 0) {
        subCategoryLi.append(ulL3); //Appending level 3
      }

    }

    //Appending main categorys
    mainLevelUl.append(categoryLi);
    categoryLi.appendChild(a);
    a.appendChild(linkText);

    if (category.subcats && category.subcats.length > 0) {
      categoryLi.append(ulL2); //Appending level 2
    }

  }
}


