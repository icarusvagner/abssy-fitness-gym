<template>
  <div style="max-width: 97%">
    <div id="chart">
      <apexchart
        type="bar"
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
  total_amount: {
    type: Array,
    required: true,
  },
  months: {
    type: Array,
    required: true,
  },
});

const series = ref([
  {
    name: 'Total',
    data: props.total_amount,
  },
]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 450,
  },
  annotations: {
    xaxis: [
      {
        x: 500,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'X annotation',
        },
      },
    ],
    yaxis: [
      {
        y: 'July',
        y2: 'September',
        label: {
          text: 'Y annotation',
        },
      },
    ],
  },
  title: {
    text: 'Total Sales',
    align: 'left',
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: props.months,
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  yaxis: {
    axisTicks: {
      show: true,
    },
  },
});
</script>
