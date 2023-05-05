import { defineStore } from 'pinia';

export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      userId: null
    };
  },
  actions: {
    reset(state) {
      state.userId = null;
    }
  },
  getters: {
    loggedId(state) {
      return state.userId;
    }
  },
  persist: {
    enabled: true
  },
});