import { api } from 'src/boot/axios';
import { defineStore } from 'pinia';
import { AdminForSelect, StaffForSelect } from 'src/types/user.type';

const useAuthStore = defineStore('auth', {
  state: () => ({
    auth                : false,
    access_token        : '',
    refresh_token       : '',
    role                : '',
    user_type           : '',
    id                  : null,
  }),

  getters: {
    isAuthenticated (state) {
      return state.auth;
    },
    getId (state) {
      return this.id;
    },
    getRole (state) {
      return this.role;
    },
    getUserType (state) {
      return state.user_type;
    },
    getAccessToken (state) {
      return state.access_token;
    },
    getRefreshToken (state) {
      return state.refresh_token;
    },
  },

  actions: {
    setAccessToken (accessToken: string) {
      this.access_token = accessToken;
    },
    setAuthenticated (data: { refreshToken: string; accessToken: string; role: string; user_type: string; id: number; }) {
      this.auth = true;
      this.role = data.role;
      this.user_type = data.user_type
      this.access_token = data.accessToken;
      this.refresh_token = data.refreshToken;
      this.id = data.id;
    },
    async ChangePassword (data: { new_pass: string; id: number; }) {
      try {

      } catch (error: any) {
        throw error.message;
      }
    },
    async LogoutUser () {
      try {
        const response = await api.post('/logout', { refresh_token: this.getRefreshToken });
        if (response.status === 200) {
          this.auth                = false;
          this.access_token        = '';
          this.refresh_token       = '';
          this.role                = '';
          this.user_type           = '';
          this.id                  = null;

          return {
            message: 'Logout Successfully',
            status: 201
          }
        }
      } catch (error: any) {
        throw error.message;
      }
    },
    async LoginUser (data: { username: string; password: string; }) {
      try {
        if (data.username !== '' && data.password !== '') {
          const response = await api.post('/login', data);
          if (response.data.result.status === 404) {
            return response.data.result
          }

          this.setAuthenticated(response.data.result);
          return {
            message: 'Success',
            status: 200
          }
        } else {
          return {
            message: 'Empty fields',
            status: 422
          }
        }
      } catch (error: any) {
        return error.response.data;
      }
    }
  },
  persist: {
    storage: localStorage,
  }
});

export default useAuthStore;
