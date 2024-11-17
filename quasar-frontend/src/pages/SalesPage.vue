<template>
  <q-page padding class="column q-gutter-y-md">
    <!-- content -->
    <h1 class="text-weight-bold text-h5">Sales Report</h1>
    <!-- <div class="column shadow-10">
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
          <q-btn
            align="center"
            color="secondary"
            label="Submit"
            @click="filter_date_ranges"
          />
        </div>
      </div>
    </div> -->
    <div class="column shadow-10">
      <div class="bg-grey-6 row">
        <span class="q-ml-md text-h6 text-weight-semibold"
          >Quick Month Filter</span
        >
      </div>
      <div class="row q-gutter-md items-center justify-center q-pa-lg">
        <q-btn
          v-for="month in months_params"
          :key="month.month_val"
          align="center"
          size="md"
          color="secondary"
          :label="month.month_name"
          @click="filter_func(month.month_val)"
        />
      </div>
    </div>
    <div class="column shadow-10">
      <div class="bg-grey-6 row">
        <span class="q-ml-md text-h6 text-weight-semibold">Summary</span>
      </div>
      <div class="row q-gutter-md items-center q-pa-md">
        <span class="text-subtitle1 text-weight-light">Total:</span>
        <q-spinner-dots v-if="isLoading" color="secondary" />
        <span v-else class="text-h5 text-weight-bold">{{
          formatNumber(total_sales)
        }}</span>
        <q-btn
          align="center"
          size="md"
          color="secondary"
          label="Reset filter"
          :loading="isLoading"
          @click="reset_filter()"
        />
      </div>
    </div>
    <div class="rounded-border shadow-10 q-pa-md">
      <LoadersComponent v-if="isLoading" />
      <BarChart v-else :months="months" :total_amount="total_amount" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { processPayments, GroupedPayment } from 'src/utils/payments.util';
import { SalesReportType } from 'src/types/dashboard.type';
import { debounce } from 'quasar';
import LoadersComponent from 'src/components/LoaderComponent.vue';
import { formatNumber } from 'src/utils/validator.util';

import PaymongoService from 'src/services/paymongo.service';

const BarChart = defineAsyncComponent({
  loader: () => import('components/charts/BarChart.vue'),
  delay: 1000,
  timeout: 3000,
  suspensible: false,
});

const paymongoService = new PaymongoService();

const total_amount = ref<string[]>([]);
const months = ref<string[]>([]);
const sales_report = ref<SalesReportType[]>([]);
const isLoading = ref(false);
const month_val = ref<string>('');
const total_sales = ref(0);

const months_params = ref<{ month_name: string; month_val: string }[]>([
  { month_name: 'Jan', month_val: '01' },
  { month_name: 'Feb', month_val: '02' },
  { month_name: 'Mar', month_val: '03' },
  { month_name: 'Apr', month_val: '04' },
  { month_name: 'May', month_val: '05' },
  { month_name: 'Jun', month_val: '06' },
  { month_name: 'Jul', month_val: '07' },
  { month_name: 'Aug', month_val: '08' },
  { month_name: 'Sep', month_val: '09' },
  { month_name: 'Oct', month_val: '10' },
  { month_name: 'Nov', month_val: '11' },
  { month_name: 'Dec', month_val: '12' },
]);

// const form = ref({
//   from_date: null,
//   to_date: null,
// });

const filter_func = (monthval: string) => {
  months.value = [];
  total_amount.value = [];
  month_val.value = monthval;
};

const reset_filter = () => {
  months.value = [];
  total_amount.value = [];
  get_payments_purchased();
};

const get_payments_purchased_filtered = debounce(() => {
  isLoading.value = true;
  sales_report.value = [];
  paymongoService.get_payments(100).then((res) => {
    let temp_res: GroupedPayment[] = processPayments(res, month_val.value);
    console.log(processPayments(res, month_val.value));

    months.value.push(...temp_res.map((item) => item['month']));
    total_amount.value.push(...temp_res.map((item) => item['totalAmount']));
    isLoading.value = false;
  });
}, 500);

const get_payments_purchased = debounce(() => {
  isLoading.value = true;
  sales_report.value = [];
  paymongoService.get_payments(100).then((res) => {
    let temp_res: GroupedPayment[] = processPayments(res);

    months.value.push(...temp_res.map((item) => item['month']));
    total_amount.value.push(...temp_res.map((item) => item['totalAmount']));
    temp_res.map(
      (item) => (total_sales.value += parseInt(item['totalAmount']))
    );
    isLoading.value = false;
  });
}, 500);

onMounted(() => {
  get_payments_purchased(); // Initial load without any filter
});

watch(month_val, () => {
  months.value = [];
  total_amount.value = [];
  get_payments_purchased_filtered();
});
</script>
