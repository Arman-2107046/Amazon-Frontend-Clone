import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption,getDeliveryDate } from "../../data/deliveryOptions.js";

import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary()
{
//
//
//
//
//

// updateCheckoutQuantity();

let cartSummaryHTML = ``;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
 
  let matchingProduct=getProduct(productId);
//   let matchingProduct;
//   products.forEach((product) => {
//     if (productId === product.id) {
//       matchingProduct = product;
//     }
//   });

  const deliveryOptionId = cartItem.deliveryOptionId;
  
  const deliveryOption=getDeliveryOption(deliveryOptionId);

//   deliveryOptions.forEach((option) => {
//     if (option.id === cartItem.deliveryOptionId) {
//       deliveryOption = option;
//     }
//   });

  // const today = dayjs();
  // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  // const dateString = deliveryDate.format('dddd, MMMM D');

  const dateString=getDeliveryDate(deliveryOption);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>

            <!-- ----------------- -->
            <!-- ----------------- -->

            <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">

            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>

            <!-- ----------------- -->
            <!-- ----------------- -->

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <!-- Delivery option components-->
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ``;
  deliveryOptions.forEach((deliveryOption) => {
    
    // const today = dayjs();
    // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    // const dateString = deliveryDate.format('dddd, MMMM D');
    let dateString=getDeliveryDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE Shipping'
      : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    renderPaymentSummary();
    // renderCheckoutHeader();

    // updateCartQuantity();
  });
});

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');

    const inputField = document.querySelector(`.js-quantity-input-${productId}`);
    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // updateQuantityUsingSaveOrKeydown(productId, inputField);
        updatePage(productId,inputField);
        renderCheckoutHeader();
        renderPaymentSummary();
      }
    });
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    // updateQuantityUsingSaveOrKeydown(productId, quantityInput);
    updatePage(productId,quantityInput);

    renderCheckoutHeader();
    renderPaymentSummary();
  });
});

// function updateCheckoutQuantity() {
//   const totalQuantity = calculateCartQuantity();
//   document.querySelector(".return-to-home-link").innerHTML = `${totalQuantity} items`;
// }

// function updateCartQuantity() {
//   const totalQuantity = calculateCartQuantity();
//   document.querySelector(".return-to-home-link").innerHTML = `${totalQuantity} items`;
// }

// function updateQuantityUsingSaveOrKeydown(productId, inputField) {
//   const newQuantity = parseInt(inputField.value, 10);

//   if (isNaN(newQuantity) || newQuantity < 0 || newQuantity >= 1000) {
//     alert("Quantity must be at least 0 and less than 1000");
//     return;
//   }

//   updateQuantity(productId, newQuantity);

//   const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
//   quantityLabel.innerHTML = newQuantity;

//   const container = document.querySelector(`.js-cart-item-container-${productId}`);
//   container.classList.remove("is-editing-quantity");

//   updateCheckoutQuantity();
// }

function updatePage(productId,inputField)
{
  const newQuantity = parseInt(inputField.value, 10);

  if (isNaN(newQuantity) || newQuantity < 0 || newQuantity >= 1000) {
    alert("Quantity must be at least 0 and less than 1000");
    return;
  }

  updateQuantity(productId, newQuantity);

  const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
  quantityLabel.innerHTML = newQuantity;

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove("is-editing-quantity");

  // updateCheckoutQuantity();
}

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  const productId = element.dataset.productId;
  const deliveryOptionId = element.dataset.deliveryOptionId;

  element.addEventListener('click', () => {
    updateDeliveryOption(productId, deliveryOptionId);
    // location.reload();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
//
//
//
//
//
}

renderOrderSummary();