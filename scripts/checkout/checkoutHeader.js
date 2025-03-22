import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
 let html = `
        <div class="header-content">
        <div class="checkout-header-left-section">
        <a href="amazon.html">
        <img class="amazon-logo" src="images/amazon-logo.png" />
        <img
            class="amazon-mobile-logo"
            src="images/amazon-mobile-logo.png"
        />
        </a>
        </div>

        <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link" href="amazon.html">${calculateCartQuantity()} items</a>)
        </div>

        <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png" />
        </div>
        </div>`;

      document.querySelector('.js-checkout-header').innerHTML=html;
}
// renderCheckoutHeader();





// import { calculateCartQuantity } from "../../data/cart.js";

// export function renderCheckoutHeader() {
//   try {
//     console.log("Rendering checkout header...");
//     console.log("Cart quantity:", calculateCartQuantity());
    
//     let html = `
//         <div class="header-content">
//         <div class="checkout-header-left-section">
//         <a href="amazon.html">
//         <img class="amazon-logo" src="images/amazon-logo.png" />
//         <img
//             class="amazon-mobile-logo"
//             src="images/amazon-mobile-logo.png"
//         />
//         </a>
//         </div>

//         <div class="checkout-header-middle-section">
//         Checkout (<a class="return-to-home-link" href="amazon.html">${calculateCartQuantity()} items</a>)
//         </div>

//         <div class="checkout-header-right-section">
//         <img src="images/icons/checkout-lock-icon.png" />
//         </div>
//         </div>`;

//     const headerElement = document.querySelector('.js-checkout-header');
//     console.log("Header element found:", headerElement);
//     if (headerElement) {
//       headerElement.innerHTML = html;
//       console.log("Header content set successfully");
//     } else {
//       console.error("Could not find header element with class .js-checkout-header");
//     }
//   } catch (error) {
//     console.error("Error in renderCheckoutHeader:", error);
//   }
// }