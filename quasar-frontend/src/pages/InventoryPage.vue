<template>
  <q-page padding>
    <!-- content -->
    <div class="q-gutter-y-md">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
      >
        <q-tab name="equipments" label="Equipments" />
        <q-tab name="supplements" label="Supplements" />
        <q-tab name="inventory" label="Inventory Log" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-transparent">
        <q-tab-panel name="equipments">

          <EquipmentsTab />
        </q-tab-panel>

        <q-tab-panel name="supplements">
          <SupplementsTab />
        </q-tab-panel>

        <q-tab-panel name="inventory">
           <div class="row items-center justify-between q-mb-md">
            <div class="text-h6">Inventory Log</div>
          </div>
          <InventoryLog />
        </q-tab-panel>

      </q-tab-panels>
    </div>
  </q-page>

</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import InventoryService from 'src/services/inventory.service';

  import EquipmentsTab from 'components/Inventory/EquipmentsTab.vue';
  import SupplementsTab from 'components/Inventory/SupplementsTab.vue';
  import InventoryLog from 'components/Inventory/InventoryLog.vue';

  const inventoryService = new InventoryService();
  const tab = ref('equipments');
</script>
