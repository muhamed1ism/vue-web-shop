import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { useProductStore } from "./useProductStore";

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      cartItems: useLocalStorage('cartItems', []),
      products: [],
      isProductInCart: false,
    }
  }),

  actions: {
    addProductToCart(productId, quantity = 1) {
      this.cart.cartItems.push({ productId: productId, quantity: quantity });
      this.saveCart();
    },

    removeProductFromCart(productId) {
      this.cart.cartItems = this.cart.cartItems.filter(item => item.productId !== productId);
      this.saveCart();
    },
    
    updateProductQuantity(productId, newQuantity) {
      const itemIndex = this.cart.cartItems.findIndex(item => item.productId === productId);

      if (itemIndex !== -1) {
        this.cart.cartItems[itemIndex].quantity = newQuantity;
      }
      this.saveCart();
    },

    saveCart() {
      useLocalStorage('cartItems', this.cart.cartItems);
    },

    checkisProductInCart(productId) {
      this.cart.isProductInCart = this.cart.cartItems.length > 0 && this.cart.cartItems.some(item => item.productId === productId);
    },
    
    
    getProductQuantity(productId) {
      const item = this.cart.cartItems.find(item => item.productId === productId);
      return item ? item.quantity : 1;
    },

    async fetchCartProducts() {
      const productStore = useProductStore();
      await productStore.fetchProducts();

      this.cart.products = productStore.products.filter(product => 
        this.cart.cartItems.some(item => item.productId === product.id)
      );
    },
  },
})