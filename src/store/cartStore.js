import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartPriceTotal: 0,
    cart: [],
  }),
  actions: {
    setTotal(args) {
      const totalPrices = args.map((e) => e.total);
      const sum = totalPrices.reduce((a, b) => a + b, 0);
      this.cartPriceTotal = sum || 0;
      return this.cartPriceTotal;
    },
    incrementProduct(productId) {
      const findProduct = this.cart.products.findIndex(e => e.id == productId);
      const item = this.cart.products[findProduct];
      item.amount++;
      item.total = item.amount * item.price;
    },
    decrementProduct(productId){
      const findProduct = this.cart.products.findIndex(e => e.id == productId);
      const item = this.cart.products[findProduct];
      if(item.amount > 0){
        item.amount--;
      }
      item.total = item.amount * item.price;
    }
  },
  getters: {
    getTotalPrice(state) {
      return state.cartPriceTotal;
    },
  },
});