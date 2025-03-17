import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


updateCartQuantity();

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${
          product.rating.stars * 10
        }.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-selected-quantity js-quantity-selector-${product.id}">

          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart added-to-cart-${product.id} ">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>
  `;
});

//update cart quantity function
function updateCartQuantity() {
  //calculating total quantity
  let cartQuantity = calculateCartQuantity();

  // cart.forEach((item) => {
  //   cartQuantity += item.quantity;
  // });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;



    //function for adding all elements to cart
    addToCart(productId);

    // function for updating cart quantity
    updateCartQuantity();





        // Show the added-to-cart message
        const addedMessage = document.querySelector(`.added-to-cart-${productId}`);
        addedMessage.style.opacity = 1;
    
        // Clear any existing timeout
        clearTimeout(addedMessage.timeoutId);
    
        // Set a new timeout to hide the message after 2 seconds
        addedMessage.timeoutId = setTimeout(() => {
          addedMessage.style.opacity = 0;
        }, 2000);


  });
});
