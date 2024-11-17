<template>
  <q-page padding class="column q-gutter-y-lg">
    <div class="row q-gutter-x-md">
      <div class="col" v-for="(item, index) in reports" :key="index">
        <DashboardCard v-bind="item" />
      </div>
    </div>
    <div class="rounded-borders shadow-10 q-pa-md">
      <LineChart
        :is_load="isLoading"
        :month_name="month_name"
        :members_count="members_count"
      />
    </div>
    <div class="rounded-borders shadow-10 q-pa-md">
      <BarChart :months="months" :total_amount="total_amount" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { IDashboardCard } from 'components/models';
import { debounce } from 'quasar';

import GraphLoaderComponent from 'components/LoaderComponent.vue';
import { processPayments } from 'src/utils/payments.util';
import DashboardService from 'src/services/dashboard.servive';
import PaymongoService from 'src/services/paymongo.service';
import { SalesReportType } from 'src/types/dashboard.type';
import { formatNumber } from 'src/utils/validator.util';

const BarChart = defineAsyncComponent({
  loader: () => import('components/charts/BarChart.vue'),
  loadingComponent: GraphLoaderComponent,
  delay: 1000,
  timeout: 3000,
  suspensible: false,
});
const LineChart = defineAsyncComponent({
  loader: () => import('components/charts/LineChart.vue'),
  loadingComponent: GraphLoaderComponent,
  delay: 1000,
  timeout: 3000,
  suspensible: false,
});
const DashboardCard = defineAsyncComponent({
  loader: () => import('components/DashboardCard.vue'),
  delay: 1000,
  timeout: 3000,
  suspensible: false,
});

const isLoading = ref(false);
const paymongoService = new PaymongoService();
const dashboardService = new DashboardService();
const members_count = ref([]);
const months = ref([]);
const total_amount = ref([]);
const month_name = ref([]);

const reports = ref<IDashboardCard[]>([
  {
    icon: 'mdi-wallet-outline',
    name: 'Total Sales',
    count: 2350.55,
  },
  {
    icon: 'mdi-account-plus',
    name: 'Members',
    count: 0,
  },
  {
    icon: 'mdi-account-tie',
    name: 'Trainers',
    count: 0,
  },
  {
    icon: 'mdi-account-multiple-outline',
    name: 'Staff',
    count: 0,
  },
]);
const sales_report = ref<SalesReportType[]>([]);

const get_dashboard = debounce(() => {
  isLoading.value = true;
  dashboardService.get_dashboard().then((res) => {
    reports.value[1]['count'] = parseInt(res.result['members']);
    reports.value[2]['count'] = parseInt(res.result['trainers']);
    reports.value[3]['count'] = parseInt(res.result['staffs']);
    isLoading.value = false;
  });
}, 500);

const get_members_per_month = debounce(() => {
  isLoading.value = true;
  dashboardService.get_members_per_month().then((res) => {
    var temp = res.result;
    temp.map((item) => {
      month_name.value.push(item['month_name']);
      members_count.value.push(parseInt(item['member_count']));
    });
    isLoading.value = false;
  });
}, 500);

const get_payments_purchased = debounce(() => {
  isLoading.value = true;
  sales_report.value = [];
  paymongoService.get_payments(100).then((res) => {
    let temp_res = processPayments(res);
    let temp_total = 0;
    temp_res.map((item) => {
      months.value.push(item['month']);
      total_amount.value.push(item['totalAmount']);
      temp_total += parseInt(item['totalAmount']);
    });
    reports.value[0]['count'] = formatNumber(temp_total);
    isLoading.value = false;
  });
}, 500);

onMounted(() => {
  get_dashboard();
  get_members_per_month();
  get_payments_purchased();
});
</script>
