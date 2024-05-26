<template>
  <q-page padding class="column q-gutter-y-md">
    <!-- content -->
    <h1 class="text-weight-bold text-h5">Sales Report</h1>
    <div class="column shadow-10">
      <div class="bg-grey-6 row">
        <span class="q-ml-md text-h6 text-weight-semibold">Date range:</span>
      </div>
      <div class="row q-gutter-md q-pa-lg">
        <div class="row q-gutter-md items-center justify-center">
          <span class="text-h6 self-start">From:</span>
          <q-input v-model="form.from_date" filled type="date" />
        </div>
        <div class="row q-gutter-md items-start">
          <span class="text-h6 self-start">To:</span>
          <q-input v-model="form.to_date" filled type="date" />
        </div>
        <div class="row items-center justify-center">
          <q-btn align="center" color="secondary" label="Submit" />
        </div>
      </div>
    </div>
    <div class="column shadow-10">
      <div class="bg-grey-6 row">
        <span class="q-ml-md text-h6 text-weight-semibold">Quick date selection</span>
      </div>
      <div class="row q-gutter-md items-center justify-center q-pa-lg">
        <q-btn align="center" size="md" color="secondary" label="Days" />
        <q-btn align="center" size="md" color="secondary" label="Weeks" />
        <q-btn align="center" size="md" color="secondary" label="Months" />
        <q-btn align="center" size="md" color="secondary" label="Years" />
      </div>
    </div>
    <div class="column shadow-10">
      <div class="bg-grey-6 row">
        <span class="q-ml-md text-h6 text-weight-semibold">Summary</span>
      </div>
      <div class="row q-gutter-md items-center q-pa-md">
        <span class="text-subtitle1 text-weight-light">Total:</span>
        <span class="text-h5 text-weight-bold">3500</span>
      </div>
    </div>
    <div class="rounded-border shadow-10 q-pa-md">
      <BarChart />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BarChart from 'components/charts/BarChart.vue';
  import AreaChart from 'components/charts/AreaChart.vue';

  const form = ref({
    from_date: null,
    to_date: null,
  })
</script>
