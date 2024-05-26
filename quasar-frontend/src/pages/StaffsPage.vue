<template>
  <q-page padding>
    <!-- content -->
    <div class="row items-center">
      <div class="col-12 col-md-4">
        <q-btn :to="{ name: 'new_staff' }" flat label="New Staff" icon="mdi-plus" text-color="secondary" />
      </div>
    </div>

    <q-separator class="q-my-lg"/>

    <StaffTable />
  </q-page>
</template>

<script setup lang="ts">
  import StaffTable from 'components/StaffTable.vue';
  import { ref } from 'vue';
</script>
