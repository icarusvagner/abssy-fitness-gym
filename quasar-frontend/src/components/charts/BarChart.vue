<template>
  <div style="max-width: 97%">
    <div id="chart">
      <apexchart type="bar" height="450" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const series = ref([{
    data: [400, 430, 448, 470, 540, 580, 690, 710, 808, 890, 920, 950]
  }]);

  const chartOptions =  ref({
    chart: {
      type: 'bar',
      height: 450
    },
    annotations: {
      xaxis: [{
        x: 500,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'X annotation',
        }
      }],
      yaxis: [{
        y: 'July',
        y2: 'September',
        label: {
          text: 'Y annotation'
        }
      }]
    },
    title: {
      text: 'Monthly Total Sales',
      align: 'left'
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: ['January','Febuary','March','April','May','June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    yaxis: {
      reversed: true,
      axisTicks: {
        show: true
      }
    }
  })

</script>
