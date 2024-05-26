<template>
  <q-page padding>
    <!-- content -->
    <div class="row items-center">
      <div class="col-12 col-md-4">
        <q-btn :to="{ name: 'new_trainer' }" flat label="New Trainer" icon="mdi-plus" text-color="secondary" />
      </div>
    </div>

    <q-separator class="q-my-lg"/>

    <TrainersTable />
  </q-page>
</template>

<script setup lang="ts">
  import TrainersTable from 'components/TrainersTable.vue';
  import { ref } from 'vue';
</script>
