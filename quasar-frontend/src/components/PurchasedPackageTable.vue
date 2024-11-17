<template>
  <q-table
    bordered
    title="Purchased Packages"
    :rows="rows"
    :columns="columns"
    row-key="fullname"
    :filter="filter"
    card-class="bg-grey-12 text-grey-10"
    :loading="isLoading"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="secondary" />
    </template>

    <template v-slot:top-right>
      <q-input
        outlined
        rounded
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { date, debounce } from 'quasar';

import PaymongoService from 'src/services/paymongo.service';

const paymongoService = new PaymongoService();
const filter = ref('');
const isLoading = ref(false);
const rows = ref<any[]>([]);
const columns = ref([
  {
    name: 'id',
    required: true,
    label: 'Transaction ID',
    align: 'left',
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'pm_reference_number',
    required: true,
    label: 'Reference Number',
    align: 'right',
    field: (row) => row.attributes.metadata.pm_reference_number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    align: 'center',
    label: 'Account Name',
    field: (row) => row.attributes.billing.name,
    sortable: true,
  },
  {
    name: 'email',
    align: 'right',
    label: 'Email address',
    field: (row) => row.attributes.billing.email,
    sortable: true,
  },
  {
    name: 'phone',
    align: 'right',
    label: 'Phone/Mobile Number',
    field: (row) => row.attributes.billing.phone,
    sortable: true,
  },
  {
    name: 'description',
    align: 'right',
    label: 'Description',
    field: (row) => row.attributes.description,
    sortable: true,
  },
  {
    name: 'amount',
    align: 'right',
    label: 'Amount',
    field: (row) => (row.attributes.amount / 100).toFixed(2),
    sortable: true,
  },
  {
    name: 'paid_at',
    align: 'right',
    label: 'Date Paid',
    field: (row) => date.formatDate(row.attributes.paid_at, 'MMM DD, YYYY'),
    sortable: true,
  },
  {
    name: 'status',
    align: 'right',
    label: 'Status',
    field: (row) => row.attributes.status,
    sortable: true,
  },
]);

const get_payments_purchased = debounce(() => {
  isLoading.value = true;
  rows.value = [];
  paymongoService.get_payments(10).then((res) => {
    rows.value = res;
    isLoading.value = false;
  });
}, 500);

onMounted(() => {
  get_payments_purchased();
});
</script>
