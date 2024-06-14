<style lang="scss" scoped>
  .background-image {
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
</style>

<template>
  <div class="window-height background-image text-grey-11" >
    <div class="column q-mx-xl q-py-lg full-height">
      <div class="row items-center text-secondary q-pa-md" style="background: rgba(0, 0, 0, 0.6); border-radius: 5px">
        <span class="text-body1 text-weight-bold q-py-xs q-px-lg" style="border-radius: 10px; border: 2px solid #66885B;">ABBSY Fitness Gym</span>
        <q-space />
        <div class="row items-center">
          <q-btn :to="{ name: 'login' }" flat dense label="member login" class="q-mr-md" />
          <span class="text-dark q-px-lg q-py-md" style="background: #66885B; background: linear-gradient(to right, #66885B 0%, #2B932B 100%); border-radius: 10px;">CALL (+63) 987 - 654 - 3211</span>
        </div>
      </div>
      <div class="col column q-gutter-y-sm text-grey-11 justify-center">
        <span class="text-h1 text-weight-bold">Get fit & healthly.</span>
        <p class="text-body1 text-grey-1 text-weight-normal">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est.</p>
        <div class="row">
          <q-btn :to="{ name: 'plan' }" outlined color="secondary" label="get a membership" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
