import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userStore: null
    };
  },
  actions: {
    reset(state) {
      state.userStore = null;
    }
  },
  getters: {
    loggedId(state) {
      return state.userStore;
    }
  },
  persist: {
    enabled: true
  },
});