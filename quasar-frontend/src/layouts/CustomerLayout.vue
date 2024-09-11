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
      </q-toolbar>
      <div
        v-if="Platform.is.mobile"
        class="row q-gutter-x-md q-pl-lg q-pb-md q-pt-md items-center justify-center"
      >
        <q-btn outline style="color: gold" label="Upgrade Package" />
        <q-btn flat color="white" label="Logout" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Platform } from 'quasar';
</script>
