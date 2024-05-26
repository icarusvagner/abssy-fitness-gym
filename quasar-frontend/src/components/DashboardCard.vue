<template>
  <div class="q-pa-md row items-start shadow-10 rounded-borders" style="height: 100px;">
    <q-icon :name=props.icon size="xl" class="col" color="secondary" />
    <div class="flex column text-uppercase col-8 text-right">
      <span class="text-h6 text-grey-14">{{ props.name }}</span>
      <span class="text-h5 text-weight-bold text-grey-10">{{ props.count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IDashboardCard } from './models'

  const props = defineProps<IDashboardCard>();
</script>
