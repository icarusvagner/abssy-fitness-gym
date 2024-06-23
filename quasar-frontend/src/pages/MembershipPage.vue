<template>
  <q-page padding>
    <!-- content -->
    <q-tabs
      v-model="tab"
      dense
      class="text-grey bg-grey-4"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
    >
      <q-tab name="purchased_pack" label="Purchased Package" />
      <q-tab name="members" label="Members" />
    </q-tabs>

    <q-separator class="q-my-md"/>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="purchased_pack" class="bg-grey-4">
        <PurchasedPackageTable />
      </q-tab-panel>

      <q-tab-panel name="members" class="bg-grey-4">
        <MembersTable />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import PurchasedPackageTable from 'components/PurchasedPackageTable.vue';
  import MembersTable from 'components/MembersTable.vue';

  const tab = ref('purchased_pack');
</script>
