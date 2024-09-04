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
  let isFirstCategory = true; // Variabel för att kontrollera första kategorin
  let subCategoryUl; 

for (const category of allCategories) {
    const categoryName = category.name;
    const categoryLi = document.createElement('li');
    categoryLi.classList.add('dropdown');

    // Skapa a-taggen för kategorin
    const a = document.createElement('a'); 
    const urlBase = "/products/"; // Vet inte om det är så vi ska ha strukturen, lätt att ändra iaf.
    const urlPath = urlBase + category.path; 
    const linkText = document.createTextNode(categoryName);
    a.href = urlPath;

    // Om det är första kategorin, skapa ul för subkategorier
    if (isFirstCategory) {
        subCategoryUl = document.createElement('ul'); 
        subCategoryUl.classList.add('dropdown-content');
        const liContainer= document.createElement('div');
        
        // Skapa subkategorier (nivå 2)
        const subcategories = category.subcats;
        for (const subcat of subcategories) {      
            const subCatName = subcat.name;
            const subCategoryLi = document.createElement('li');
            subCategoryLi.classList.add('subCategoryLi');
            const arrow = document.createElement('span');
            arrow.classList.add('material-symbols-outlined');
            arrow.innerText = 'arrow_right';
            arrow.style.visibility = 'hidden';
            const subLink = document.createElement('a'); 
            const subUrlPath = urlBase + subcat.path; 
            console.log(subUrlPath);
            
            const sublinkText = document.createTextNode(subCatName);
            subLink.href = subUrlPath;

            subCategoryUl.append(liContainer);
            liContainer.append(subCategoryLi);
            subCategoryLi.append(arrow, subLink);
            subLink.appendChild(sublinkText);
        }

        isFirstCategory = false; 
    }

    mainLevelUl.append(categoryLi);
    categoryLi.appendChild(a);
    a.appendChild(linkText);

    // Lägg till subCategoryUl i den första kategorin
    if (isFirstCategory === false && category.subcats && category.subcats.length > 0) {
        categoryLi.append(subCategoryUl);
    }
}

  const ulDropdownContent = document.querySelector('.dropdown-content')
  const divEl = document.createElement('div');
  const imageSources = [
    "./images/axelShoes.webp",  
    "./images/axelShoes.webp", 
    // Lägg till fler bildvägar här om det behövs
];

// Loop för att skapa och lägga till bilder
for (const src of imageSources) {
    const imgEl = document.createElement('img');
    imgEl.src = src;
    imgEl.style.width = '350px';
    imgEl.style.height = '500px';
    divEl.appendChild(imgEl); 
}
    ulDropdownContent.append(divEl);

  const subCategoryLiHover = document.querySelectorAll('.subCategoryLi');
  const arrows = document.querySelectorAll('.material-symbols-outlined');
  
  // Döljer alla arrows och visar bara den som är associerad med den subkategori som hovras över
  subCategoryLiHover.forEach(subCategoryLi => {
    subCategoryLi.addEventListener('mouseover', function() {
      // Döljer alla arrows
      arrows.forEach(arrow => {
        arrow.style.visibility = 'hidden';
      });
      
      // Visa arrow i den hovrade subCategoryLi
      const subCategoryArrow = subCategoryLi.querySelector('.material-symbols-outlined');
      if (subCategoryArrow) {
        subCategoryArrow.style.visibility= 'visible';
      }
    });
  
    // Återställ dölja alla arrows när musen lämnar subCategoryLi
    subCategoryLi.addEventListener('mouseout', function() {
      arrows.forEach(arrow => {
        arrow.style.visibility = 'hidden';
      });
    });
  });
   
}