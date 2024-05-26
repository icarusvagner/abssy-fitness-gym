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
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-transparent">
        <q-tab-panel name="equipments">
          <div class="row items-center justify-between q-mb-md">
            <div class="text-h6">Equipments</div>
            <q-btn round color="secondary" icon="mdi-plus" >
              <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
                register equipment
              </q-tooltip>
            </q-btn>
          </div>
          <EquipmentsTab />
        </q-tab-panel>

        <q-tab-panel name="supplements">
           <div class="row items-center justify-between q-mb-md">
            <div class="text-h6">Supplements</div>
            <q-btn round color="secondary" icon="mdi-plus" >
              <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
                register supplement
              </q-tooltip>
            </q-btn>
          </div>
          <SupplementsTab />
        </q-tab-panel>

        <!-- <q-tab-panel name="movies"> -->
        <!--   <div class="text-h6">Movies</div> -->
        <!--   Lorem ipsum dolor sit amet consectetur adipisicing elit. -->
        <!-- </q-tab-panel> -->
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import EquipmentsTab from 'components/Inventory/EquipmentsTab.vue';
  import SupplementsTab from 'components/Inventory/SupplementsTab.vue';

  const tab = ref('equipments');
</script>
