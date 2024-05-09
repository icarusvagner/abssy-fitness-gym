<template>
  <div class="q-pa-md row items-start shadow-10 rounded-borders" style="height: 100px;">
    <q-icon :name=props.icon size="xl" class="col"/>
    <div class="flex column text-uppercase col-8 text-right">
      <span class="text-h6 text-grey-10">{{ props.name }}</span>
      <span class="text-h5 text-weight-bold">{{ props.count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  export interface IDashboardCard {
    icon: string;
    name: string;
    count: number;
  }

  const props = defineProps<IDashboardCard>();
</script>
