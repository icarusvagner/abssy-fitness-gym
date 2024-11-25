<template>
  <div class="column q-gutter-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Equipments</div>
      <q-btn round color="secondary" icon="mdi-plus" @click="equip = !equip">
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
          register equipment
        </q-tooltip>
      </q-btn>
    </div>

    <q-table
      ref="tableRef"
      bordered
      title="Equipments"
      :rows="rows"
      :columns="columns"
      row-key="item_name"
      :filter="filter"
      :loading="isLoading"
      card-class="bg-grey-12 text-grey-10"
      table-class="text-capitalize"
    >
      <template v-slot:top-right>
        <q-input
          color="secondary"
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

      <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template>

      <template v-slot:body-cell-action="props">
        <q-td key="action" :props="props">
          <q-btn
            dense
            size="sm"
            color="secondary"
            icon="mdi-plus"
            class="q-mr-sm"
            @click="deducted_add(props.row, 'add')"
          />
          <q-btn
            dense
            size="sm"
            flat
            text-color="grey-10"
            icon="mdi-minus"
            @click="deducted_add(props.row, 'minus')"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="equip" persistent>
    <q-card style="width: 700px; max-width: 80vw" class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Equipment</div>
          <q-space />
          <q-btn dense icon="close" flat round v-close-popup @click="onReset" />
        </q-card-section>

        <q-card-section>
          <div class="column q-gutter-y-sm">
            <q-input
              outlined
              color="secondary"
              v-model="equipmentForm.brand_name"
              label="Brand name"
              :rules="[(val) => !!val || 'Enter equipment brand name']"
            />
            <q-input
              outlined
              color="secondary"
              v-model="equipmentForm.classification"
              label="Classification"
              :rules="[(val) => !!val || 'Enter equipment classification']"
            />
            <q-input
              outlined
              color="secondary"
              v-model="equipmentForm.base_count"
              type="number"
              min="1"
              label="Quantity"
              :rules="[(val) => val > 0 || 'Enter base Quantity']"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="close" v-close-popup @click="onReset" />
          <q-btn type="submit" color="secondary" label="Add" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { debounce, Notify } from 'quasar';

import InventoryService from 'src/services/inventory.service';
import {
  InventoryForInsert,
  InventoryForUpdate,
  InventoryForSelect,
  InventoryForGetWrapper,
} from 'src/types/inventory.type';

const inventoryService = new InventoryService();
const rows = ref<InventoryForGetWrapper>([]);
const isLoading = ref(false);
const filter = ref('');
const equip = ref(false);
const isSubmit = ref(false);
const equipmentForm = ref<InventoryForInsert>({
  brand_name: '',
  classification: '',
  base_count: 0,
  p_type: 'equipment',
});
const equipmentUpdate = ref<InventoryForUpdate>({
  inventory_id: 0,
  quantity: 0,
  p_type: '',
  classification: '',
});

const columns = ref([
  { name: 'action', align: 'left', label: 'Action' },
  {
    name: 'item_name',
    align: 'left',
    label: 'Brand name',
    field: (row) => row.item_name,
    sortable: true,
  },
  {
    name: 'item_type',
    label: 'Classification',
    field: 'item_type',
    sortable: true,
  },
  { name: 'base_count', label: 'Available', field: 'base_count' },
  { name: 'total_count', label: 'Total count', field: 'total_count' },
  { name: 'ctime', label: 'Date added', field: 'ctime' },
]);

const selectInventory = debounce((data: InventoryForSelect) => {
  rows.value = [];
  inventoryService.get(data).then((res) => {
    rows.value = res.result;
    isLoading.value = false;
  });
}, 1000);

const onSubmit = () => {
  inventoryService.create(equipmentForm.value).then((res) => {
    if (res.result.status === 201) {
      isSubmit.value = true;
      onReset();

      selectInventory({ id: 0, p_type: 'equipment' });
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'positive',
        icon: 'check',
      });
      equip.value = false;
    } else {
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'negative',
        icon: 'mdi-alert',
      });
    }
  });
};

const onReset = debounce(() => {
  equipmentForm.value.brand_name = '';
  equipmentForm.value.classification = '';
  equipmentForm.value.base_count = '';
}, 500);

const deducted_add = (prop: any, type: string) => {
  isLoading.value = true;
  equipmentUpdate.value.inventory_id = prop.inventory_id;
  equipmentUpdate.value.quantity = 1;
  equipmentUpdate.value.p_type = type;
  equipmentUpdate.value.classification = 'equipment';

  inventoryService.update(equipmentUpdate.value).then((res) => {
    if (res.result.status === 200) {
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'positive',
        icon: 'check',
      });
      selectInventory({ id: 0, p_type: 'equipment' });
    }
  });
};

onMounted(() => {
  isLoading.value = true;
  selectInventory({ id: 0, p_type: 'equipment' });
});
</script>
