import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      userId: null
    }
  },
  actions: {
    reset() {
      this.userId = null
    }
  },
  getters: {
    loggedId() {
      return this.userId
    }
  },
  persist: {
    enabled: true
  },
})

export const useCartStore = defineStore('userCart', {
  state: () => ({
    userCart: [],
    cartTotal: 0
  }),
  actions: {
    reset() {
      this.userCart = ''
    }
  },
  getters: {
    getCart(state) {
      return state.userCart
    },
    getTotalCart(state) {
      return state.cartTotal
    }
  },
})

export const useCardStore = defineStore('userCard', {
  state: () => ({
    userCard: [],
  }),
  actions: {
    reset() {
      this.userCard = ''
    }
  },
  getters: {
    getCard(state) {
      return state.userCard
    },
  },
})