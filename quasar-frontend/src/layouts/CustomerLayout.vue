<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png" />
          </q-avatar>
          ABBSY Fitness GYM
        </q-toolbar-title>
        <div class="row q-gutter-x-md">
          <q-btn outline style="color: gold" label="Upgrade Package" />
          <q-btn flat color="white" label="Logout" @click="logout_handler" />
        </div>
      </q-toolbar>
      <div
        v-if="Platform.is.mobile"
        class="row q-gutter-x-md q-pl-lg q-pb-md q-pt-md items-center justify-center"
      >
        <q-btn flat color="white" label="Logout" @click="logout_handler" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Platform } from 'quasar';
import { useRouter } from 'vue-router';
import useAuthStore from 'stores/auth-store';

const router = useRouter();
const authStore = useAuthStore();
const logout_handler = async () => {
  await authStore.LogoutUser();
  router.push({ name: 'login' });
};
</script>
