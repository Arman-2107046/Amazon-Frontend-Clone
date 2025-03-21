import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";




export function renderPaymentSummary() {
  // Initialize variables to hold the total product price and shipping price in cents
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  // Iterate over each item in the cart to calculate the total price and shipping cost
  cart.forEach((cartItem) => {
    // Retrieve the product details using the product ID from the cart item
    const product = getProduct(cartItem.productId);

    // Calculate the total price for the current product based on quantity and price
    productPriceCents += cartItem.quantity * product.priceCents;

    // Retrieve the delivery option details using the delivery option ID from the cart item
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    // Add the shipping cost for the current delivery option to the total shipping cost
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;

  const totalCents=totalBeforeTaxCents+taxCents;

  const paymentSummaryHTML=`
<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

  `;

  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}
