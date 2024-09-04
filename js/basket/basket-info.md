# Basket

This document briefly describes the contents of the folder and how to use the basket functionality.

## How to Initialize the Basket

The basket functionality is initialized through `init.js`. When this script is called, and if a corresponding [HTML basket element](#html-basket-element-structure) is present, it will automatically be populated with items from `sessionStorage`.

### Steps to Implement:
1. **Add "Add to Cart" Buttons**: 
   - This can be done by using the `AddToCartButton` class, or by adding the class `add-to-cart` on a button item.
   - These buttons need to either be in a `.product-page` or `.productCard` wrapper, that need to have the `id` of the product that should be added to the basket.

2. **Import `init.js`**:
   - Ensure `init.js` is imported into your project, in `script.js`.
   - Ex: `import "./basket/init.js`;
   - Once "Add to Cart" buttons are in place and `init.js` is imported, the basket should work.

## HTML Basket Element Structure

The HTML basket element can be created through HTML or inserted via JavaScript. IT can be customized freely with whichever styling. But it must contain the following IDs:

- `#basket` (main wrapper of the whole basket)
- `#basketWrapper` (will contain the automatically inserted basket items)
- `#basketLength` (will display the number of items in the basket)
- `#basketTotal` (will display the total cost of the entire basket)

### Example of the Basket Structure

```html
<div id="basket">

  <h3>Basket</h3>
  
  <div id="basketWrapper">
    <!-- basket items will be appended here -->
  </div>

  <div>Items in cart: 
    <span id="basketLength">
      <!-- number of items in basket will appear here -->
    </span>
  </div>
  
  <div>Total: 
    <span id="basketTotal">
      <!-- basket total cost will appear here -->
    </span>
    SEK
  </div>
</div>
