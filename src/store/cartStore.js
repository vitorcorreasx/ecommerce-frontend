import { defineStore } from 'pinia';

export const useCartStore = defineStore('userCart', {
  state: () => ({
    selectedCart: [],
    cartTotal: 0,
    cart: [],
  }),
  actions: {
    reset(state) {
      state.selectedCart = [];
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