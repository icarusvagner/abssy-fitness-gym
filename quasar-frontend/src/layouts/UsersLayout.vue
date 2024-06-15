<style lang="scss" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png">
          </q-avatar>
          ABBSY Fitness Gym
        </q-toolbar-title>

        <div v-if="!Platform.is.mobile">
          <q-btn flat dense no-caps :to="{ name: 'login' }" label="Shop" class="q-px-md" />
          <q-btn flat dense no-caps :to="{ name: 'login' }" label="Events" class="q-px-md" />
          <q-btn flat dense no-caps :to="{ name: 'login' }" label="About us" class="q-px-md" />
          <q-btn flat dense no-caps :to="{ name: 'login' }" label="Member Login" class="q-px-md" />
        </div>

        <q-btn v-else flat dense icon="mdi-menu" color="grey-11" @click="drawer = !drawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="Platform.is.mobile" show-if-above v-model="drawer" side="left" class="bg-secondary column">
      <div class="row items-center q-pa-lg q-gutter-x-md">
        <q-avatar>
          <img src="../assets/logo.png">
        </q-avatar>
        <span class="text-h6">ABBSY Fitness Gym</span>
      </div>
      <q-list padding class="menu-list column items-start q-ml-lg text-grey-11 text-h6 q-gutter-y-lg">
        <q-item clickable v-ripple :to="{ name: 'shop' }">
          <q-item-section avatar>
            <q-icon name="mdi-store" />
          </q-item-section>

          <q-item-section>
            Shop
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'event' }">
          <q-item-section avatar>
            <q-icon name="mdi-calendar" />
          </q-item-section>

          <q-item-section>
            Events
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'about' }">
          <q-item-section avatar>
            <q-icon name="mdi-web" />
          </q-item-section>

          <q-item-section>
            About Us
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'login' }">
          <q-item-section avatar>
            <q-icon name="mdi-login" />
          </q-item-section>

          <q-item-section>
            Member Login
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
  import { Platform } from 'quasar';
  import { ref } from 'vue';

  const drawer = ref(false);
</script>
