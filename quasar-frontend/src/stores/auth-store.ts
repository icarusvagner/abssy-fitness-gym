import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: false,
  }),

  getters: {
    isAuthenticated (state) {
      return state.auth;
    }
  },

  actions: {
    setAuthenticated () {
      this.auth = true;
    }
  }
});

export default useAuthStore;
