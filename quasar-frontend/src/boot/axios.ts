import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import useAuthStore from 'stores/auth-store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:3000/api' });

const refresToken = async () => {
  try {
    const authStore = useAuthStore();
    const response = await api.post('/refresh/token', { refreshToken: authStore.getRefreshToken });

    return response.data;
  } catch (error: any) {
    throw error.message;
  }
}

api.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (!config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${authStore.getAccessToken}`
  }
  return config;
}, error => {
  return Promise.reject(error);
})

api.interceptors.response.use(response => response, async (error) => {
  const authStore = useAuthStore();
  const prevReq = error?.config;

  if (error?.response.status === 401) {
    prevReq.sent = true;
    const token = await refresToken();

    if (token.accessToken) {
      prevReq.headers['Authorization'] = `Bearer ${token.accessToken}`;

      authStore.setAccessToken(token.accessToken);

      return api(prevReq);
    }
  }

  return Promise.reject(error);
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
