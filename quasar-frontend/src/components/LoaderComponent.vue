<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-skeleton height="50px" />
      <q-skeleton height="50px" width="150px" />
      <q-skeleton height="150px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: 'GraphLoaderComponent',
});
</script>
