<style lang="scss" scoped>
  .background-image {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
</style>

<template>
  <q-page >
    <div v-if="!Platform.is.mobile" class="background-image text-grey-11" >
      <div class="column q-mx-xl q-py-lg full-height">
        <div class="col column q-gutter-y-sm text-grey-11 justify-center">
          <span class="text-h1 text-weight-bold">Get fit & healthly.</span>
          <p class="text-body1 text-grey-1 text-weight-normal">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est.</p>
          <div class="row">
            <q-btn :to="{ name: 'plan' }" outlined color="secondary" label="get a membership" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="window-height background-image text-grey-11">
      <div class="column q-mx-sm q-py-sm full-height">

        <div class="col column q-gutter-y-sm text-grey-11 justify-center q-pa-md">
          <span class="text-h3 text-weight-bold">Get fit & healthly.</span>
          <p class="text-grey-1 text-weight-normal">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est.</p>
          <div class="row">
            <q-btn :to="{ name: 'plan' }" outlined color="secondary" label="get a membership" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { Platform } from 'quasar';
</script>
