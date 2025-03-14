export const cart=[];


//add to cart function
export function addToCart(productId)
{
 // Check if the product is already in the cart
 let matchingItem = null;

 cart.forEach((cartItem) => {
   if (productId === cartItem.productId) {
     matchingItem = cartItem;
   }
 });

 // Increase quantity if the product is already in the cart
 if (matchingItem) {
   matchingItem.quantity++;
 } else {
   // Add the product to the cart if it's not already present
   cart.push({
     productId: productId,
     quantity: 1,
   });
 }
}