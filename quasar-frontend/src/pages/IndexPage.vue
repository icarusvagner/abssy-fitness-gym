<template>
  <q-page padding class="column q-gutter-y-lg">
    <div class="row q-gutter-x-md">
      <div class="col" v-for="(item, index) in reports" :key="index">
        <DashboardCard v-bind="item" />
      </div>
    </div>
    <div class="rounded-borders shadow-10 q-pa-md">
      <LineChart />
    </div>
    <div class="rounded-borders shadow-10 q-pa-md">
      <BarChart />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { IDashboardCard } from 'components/models';

const BarChart = defineAsyncComponent(() => import('components/charts/BarChart.vue'));
const LineChart = defineAsyncComponent(() => import('components/charts/LineChart.vue'));
const DashboardCard = defineAsyncComponent(() => import('components/DashboardCard.vue'));

const reports = ref<IDashboardCard[]>([
  {
    icon: 'mdi-wallet-outline',
    name: 'Total Sales',
    count: 2350.55,
  },
  {
    icon: 'mdi-account-plus',
    name: 'Members',
    count: 55,
  },
  {
    icon: 'mdi-account-tie',
    name: 'Trainers',
    count: 13,
  },
  {
    icon: 'mdi-account-multiple-outline',
    name: 'Staff',
    count: 5,
  },
])

</script>
