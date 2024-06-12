<template>

  <q-table
    ref="tableRef"
    bordered
    title="Supplements"
    :rows="rows"
    :columns="columns"
    row-key="item_name"
    :filter="filter"
    :loading="isLoading"
    card-class="bg-grey-12 text-grey-10"
    table-class="text-capitalize"
  >
    <template v-slot:top-right>
      <q-input color="secondary" outlined rounded dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:loading>
      <q-inner-loading showing color="secondary" />
    </template>
  </q-table>

</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { InventoryLogForSelectWrapper } from 'src/types/inventory.type';
  import InventoryService from 'src/services/inventory.service';
  import { debounce } from 'quasar';

  const inventoryService = new InventoryService();
  const isLoading = ref(false);
  const filter = ref('');
  const rows = ref<InventoryLogForSelectWrapper>([]);
  const columns = ref([
    { name: 'item_name', align: 'left', label: 'Item name', field: 'item_name', sortable: true },
    { name: 'item_type', label: 'Item type', field: 'item_type', sortable: true },
    { name: 'classification_type', label: 'Classification type', field: 'classification_type', sortable: true },
    { name: 'count_added', label: 'Count added', field: 'count_added', sortable: true },
    { name: 'log_state', label: 'Log state', field: 'log_state', sortable: true },
    { name: 'date_added', label: 'Date add', field: 'date_added', sortable: true },
  ]);

  const get_log_view = debounce(() => {
    rows.value = [];
    inventoryService.get_log().then(res => {
      rows.value = res.result;
      isLoading.value = false;
    })
  }, 1000);

  onMounted(() => {
    isLoading.value = true;
    get_log_view();
  })
</script>
