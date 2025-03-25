class Cart {
    // Properties to store cart items and the local storage key
    cartItems;
    localStorageKey;
  
    // Constructor to initialize the cart with a local storage key
    constructor(localStorageKey) {
      this.localStorageKey = localStorageKey;
  
      // Load cart items from local storage when a new Cart instance is created
      this.loadFromStorage();
    }
  
    // Method to load cart items from local storage
    loadFromStorage() {
      // Parse the cart items from local storage using the provided key
      this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
  
      // If no cart items are found, initialize with default items
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 4,
            deliveryOptionId: '1'
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            deliveryOptionId: '2'
          }
        ];
      }
    }
  
    // Method to save cart items to local storage
    saveToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
  
    // Method to add a product to the cart
    addToCart(productId) {
      // Retrieve the selected quantity from the DOM
      let selectedQuantity = parseInt(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );
  
      let matchingItem = null;
  
      // Check if the product is already in the cart
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      // If the product is already in the cart, increase its quantity
      if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
      } else {
        // If the product is not in the cart, add it with the selected quantity
        this.cartItems.push({
          productId: productId,
          quantity: selectedQuantity,
          deliveryOptionId: '1'
        });
      }
  
      // Save the updated cart to local storage
      this.saveToStorage();
    }
  
    // Method to remove a product from the cart
    removeFromCart(productId) {
      let newCart = [];
  
      // Filter out the product to be removed
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
  
      // Update the cart with the remaining items
      this.cartItems = newCart;
      this.saveToStorage();
    }
  
    // Method to update the delivery option for a product in the cart
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
  
      // Find the product in the cart
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      // Update the delivery option for the product
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }
  
  // Create a new Cart instance for general use
  const cart = new Cart('cart-oop');
  
  // Create a new Cart instance for business use
  const businessCart = new Cart('cart-business');
  