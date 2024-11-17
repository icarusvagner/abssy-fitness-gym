<template>
  <div v-if="props.is_load" class="q-pa-md">
    <div class="q-gutter-md">
      <q-skeleton height="50px" />
      <q-skeleton height="50px" width="150px" />
      <q-skeleton height="150px" />
    </div>
  </div>
  <div v-else style="max-width: 97%">
    <div id="chart">
      <apexchart
        type="line"
        height="450"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  month_name: {
    type: Array,
    required: true,
  },
  members_count: {
    type: Array,
    required: true,
  },
  is_load: {
    type: Boolean,
    required: true,
  },
});

const series = ref([
  {
    name: 'MEMBERS',
    data: props.members_count,
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: 'Members by Month',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: props.month_name,
  },
});
</script>
