import { deliveryOptions } from "./deliveryOptions.js";


export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart)
     {
  cart = [
    // {
    //   productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //   quantity: 4,
    //   deliveryOptionId:'1'
    // },
    // {
    //   productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    //   quantity: 2,
    //   deliveryOptionId:'2'
    // }
  ];
}



//add to cart function
export function addToCart(productId) {
  // Check if the product is already in the cart

          // another way
          let selectedQuantity = parseInt(
            document.querySelector(`.js-quantity-selector-${productId}`).value
          );

  let matchingItem = null;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Increase quantity if the product is already in the cart
  if (matchingItem) {
    matchingItem.quantity+=selectedQuantity;
  } else {
    // Add the product to the cart if it's not already present
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId:'1'
    });
  }
  saveToStorage();
}

//local storage.

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//removing
export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}


export function calculateCartQuantity()
{
  let totalQuantity=0;

  cart.forEach((cartItem)=>{
    totalQuantity+=cartItem.quantity;
  });

  return totalQuantity;
  
}


export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}




export function updateDeliveryOption(productId, deliveryOptionId)
{
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      } 
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      saveToStorage(); 
}

