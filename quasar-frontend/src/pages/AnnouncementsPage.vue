<template>
  <q-page padding>
    <!-- content -->
    <div class="row items-center justify-between">
      <div class="text-h6 text-weight-light">Announcements</div>
      <q-btn round color="secondary" icon="mdi-plus" @click="new_announce = true" >
        <q-tooltip anchor="bottom middle" self="top left" :offset="[15, 10]">
          new announcement
        </q-tooltip>
      </q-btn>
    </div>
    <div class="q-mt-md">
      <q-expansion-item
        icon="mdi-bullhorn-variant-outline"
        label="By admin"
        caption="John Doe"
      >
        <q-card class="bg-grey-3">
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        icon="mdi-bullhorn-variant-outline"
        label="By Staff"
        caption="John Doe"
      >
        <q-card class="bg-grey-3">
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

    </div>
  </q-page>

  <q-dialog v-model="new_announce" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">New Announcements</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section style="width: 450px">
        <q-input
          v-model="text"
          filled
          type="textarea"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" outlined v-close-popup />
        <q-btn flat label="Add" color="secondary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const new_announce = ref(false);
  const text = ref('');
</script>
