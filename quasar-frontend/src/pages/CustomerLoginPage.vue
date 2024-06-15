<template>
  <div class="column items-center justify-center window-height q-pa-md">
    <div class="column items-center q-pa-lg shadow-10 q-gutter-y-md" style="border-radius: 10px;">
      <span class="text-left text-h5">ABBSY Fitness Gym Member Login</span>
      <div class="column q-gutter-y-md full-width q-pb-lg">
        <q-input v-model="text" color="secondary" label="E-mail address" class="col"/>
        <q-input v-model="text" color="secondary" label="Membership code" class="col" />
        <q-btn color="secondary" label="Signin" class="q-mt-lg" />
        <q-btn flat dense :to="{ name: 'landing_page' }" align="center" label="back to homepage" size="sm" class="q-py-sm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const text = ref('');
</script>
