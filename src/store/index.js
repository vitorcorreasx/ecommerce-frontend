import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      userId: null
    }
  },
  actions:{
    reset(){
      this.userId = null
    }
  },
  getters:{
    loggedId(){
      return this.userId
    }
  },
  persist: {
    enabled: true
  },
})

export const useCartStore = defineStore('userCart', {
  state: () => ({
      userCart: []
  }),
  actions:{
    reset(){
      this.userCart = ''
    }
  },
  getters:{
    getCart(state){
      return state.userCart
    }
  }
})