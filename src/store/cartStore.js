import { defineStore } from 'pinia';

export const useCartStore = defineStore('userCart', {
  state: () => ({
    selectedCart: [],
    cartTotal: 0,
    cart: [],
    totalAmount: 0,
  }),
  actions: {
    reset() {
      this.selectedCart = [];
    },
  },
  getters: {
    getSelectedCart(state) {
      return state.selectedCart;
    },
    getTotalCart(state) {
      return state.cartTotal;
    },
  },
});