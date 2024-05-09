<template>
  <div style="max-width: 97%">
    <div id="chart">
      <apexchart type="line" height="450" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const series = ref([{
    name: "MEMBERS",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }])

  const chartOptions = ref({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Members by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  })
</script>
