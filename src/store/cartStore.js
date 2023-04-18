import { defineStore } from 'pinia';

export const useCartStore = defineStore('userCart', {
  state: () => ({
    userCart: [],
    cartTotal: 0
  }),
  actions: {
    reset() {
      this.userCart = '';
    }
  },
  getters: {
    getCart(state) {
      return state.userCart;
    },
    getTotalCart(state) {
      return state.cartTotal;
    }
  },
});