<template>
  <div id="chart">
    <apexchart type="area" :height=props.height :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineComponent } from 'vue';

  defineComponent({
    name: 'AreaChart'
  })

  const props = defineProps<{
    height: number,
    text: string,
    totalCount: string,
  }>();

  const series = ref([{
    name: props.text,
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }]);

  console.log(series.value)

  const chartOptions = ref({
    chart: {
      type: 'area',
      height: props.height,
      group: 'sparklines',
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight'
    },

    title: {
      text: props.totalCount,
      align: 'left',
      style: {
        fontSize: '24px'
      }
    },
    subtitle: {
      text: props.text,
      align: 'left'
    },
//    labels: series.value[0].data.map(m => `Sales ${m}`),
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  });
</script>
