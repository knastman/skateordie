import { categories } from "./database/query.js";

/*********************************
  Display product navigation
**********************************/

export function displayCategories(){
  const mainLevelUl = document.querySelector('#main-level'); //Första nivån
  
  //Get all categories from db
  const allCategories = categories.getAll();
  console.log(allCategories);
  
  // let isFirstCategory = true; // Variabel för att kontrollera om subkategprier redan finns 
  // let ulL2; 

  //Create nav with categories
  for (const category of allCategories) {
    const categoryName = category.name; //Get category names
    const categoryLi = document.createElement('li');
    const ulL2 = document.createElement('ul'); //Lista för level 2
    // ulL2.classList.add('dropdown-content');
    // categoryLi.classList.add('dropdown');

    //Nav links level 1
    const linkText = document.createTextNode(categoryName);
    const a = document.createElement('a'); //Om path ska användas
    const urlBase = "/products/"; //Om path ska användas
    const urlPath = urlBase + category.path; //Om path ska användas
    a.href = urlPath; //Om path ska användas

    // checkar om det redan finns subkategorier (stod denna innan men stämmer inte? // Om det är första kategorin, skapa ul för subkategorier)
    // if (isFirstCategory) {
    //   const liContainer= document.createElement('div');

    //******** LEVEL 2 ************** 
    const subcategories = category.subcats; //Get subcategories l2
    for (const subcat of subcategories) {  
      const subCatName = subcat.name;      
      const subCategoryLi = document.createElement('li');
      // subCategoryLi.classList.add('subCategoryLi');

      //Nav links level 2
      const sublinkText = document.createTextNode(subCatName);
      const a = document.createElement('a'); //Om path ska användas
      const urlPath = urlBase + subcat.path; //Om path ska användas
      a.href = urlPath;//Om path ska användas


      // //Nav links level 2 - Andréas
      // const sublinkText = document.createTextNode(subCatName); 
      // const subLink = document.createElement('a'); /
      // const subUrlPath = urlBase + subcat.path; 
      // subLink.href = subUrlPath;
      // //Arrows
      // const arrow = document.createElement('span');
      // arrow.classList.add('material-symbols-outlined');
      // arrow.innerText = 'arrow_right';
      // arrow.style.visibility = 'hidden';


        // ******** LEVEL 3 ************** 
        const ulL3 = document.createElement('ul'); 
        const subcategoriesL3 = subcat.subcats; //Get subcategories l3
        console.log('subcategoriesL3'); 
        console.log(subcategoriesL3); //Funkar

        for (const subcatL3 of subcategoriesL3) {  
          const subCatNameL3 = subcatL3.name; 
          const subCategoryLiL3 = document.createElement('li');
    
          //Nav links lev 3
          const sublinkTextL3 = document.createTextNode(subCatNameL3);
          const a = document.createElement('a'); //Om path ska användas
          const urlPath = urlBase + subcatL3.path; //Om path ska användas
          a.href = urlPath;//Om path ska användas
    
    
          //Appending level 3
          ulL3.append(subCategoryLiL3);
          subCategoryLiL3.appendChild(a);
          a.appendChild(sublinkTextL3);
        }

        //Appending level 2
        ulL2.append(subCategoryLi);
        subCategoryLi.appendChild(a);
        a.appendChild(sublinkText);

        //Appending level 2 - Andréas
        // ulL2.append(liContainer);
        // liContainer.append(subCategoryLi);
        // subCategoryLi.append(arrow, subLink);
        // subLink.appendChild(sublinkText);

        // Om det finns subkategorier i level2 skapas level 3
        if (subcat.subcats && subcat.subcats.length > 0) {
          subCategoryLi.append(ulL3); //Appending level 3
        }
      }

    //   isFirstCategory = false; 
    // }

    //Appending main categorys
    mainLevelUl.append(categoryLi);
    categoryLi.appendChild(a);
    a.appendChild(linkText);

    //Om det finns subkategorier i level1 skapas level 2
    if (category.subcats && category.subcats.length > 0) {
      categoryLi.append(ulL2); //Appending level 2
    }

    //Andréas kod
    // if (isFirstCategory === false && category.subcats && category.subcats.length > 0) {
    //   categoryLi.append(ulL2);
    // }

  }



  
/********** Nedan endast gränssnittsfunktonalitet - Inget ändrat av Petra ************/

//   const ulDropdownContent = document.querySelector('.dropdown-content')
//   const divEl = document.createElement('div');
//   const imageSources = [
//     "./images/axelShoes.webp",  
//     "./images/axelShoes.webp", 
//     // Lägg till fler bildvägar här om det behövs
// ];

// // Loop för att skapa och lägga till bilder
// for (const src of imageSources) {
//     const imgEl = document.createElement('img');
//     imgEl.src = src;
//     imgEl.style.width = '350px';
//     imgEl.style.height = '500px';
//     divEl.appendChild(imgEl); 
// }
//     ulDropdownContent.append(divEl);

//   const subCategoryLiHover = document.querySelectorAll('.subCategoryLi');
//   const arrows = document.querySelectorAll('.material-symbols-outlined');
  
//   // Döljer alla arrows och visar bara den som är associerad med den subkategori som hovras över
//   subCategoryLiHover.forEach(subCategoryLi => {
//     subCategoryLi.addEventListener('mouseover', function() {
//       // Döljer alla arrows
//       arrows.forEach(arrow => {
//         arrow.style.visibility = 'hidden';
//       });
      
//       // Visa arrow i den hovrade subCategoryLi
//       const subCategoryArrow = subCategoryLi.querySelector('.material-symbols-outlined');
//       if (subCategoryArrow) {
//         subCategoryArrow.style.visibility= 'visible';
//       }
//     });
  
//     // Återställ dölja alla arrows när musen lämnar subCategoryLi
//     subCategoryLi.addEventListener('mouseout', function() {
//       arrows.forEach(arrow => {
//         arrow.style.visibility = 'hidden';
//       });
//     });
//   });
   
}



