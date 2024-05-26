<template>
  <div class="row window-height" style="background-color: #eee8eb;">
    <!-- content -->
    <div class="col-12 col-md-8 full-height column justify-center items-center">
      <div class="column q-gutter-y-lg">
        <q-img src="../assets/logo3.png" alt="logo" height="250px" width="250px" fit="fill" />
        <span class="text-h2 text-bold text-secondary bg-grey-4 q-pa-md rounded-borders">ABBSY Fitness Gym</span>
      </div>
    </div>
    <div class="col-12 col-md-4 full-height column justify-center q-pa-lg">
      <q-form class="column q-gutter-md">
        <span class="text-h5 text-left">Sign in to your account</span>
        <q-input outlined v-model="form.username" label="Username" color="secondary" />
        <q-input outlined v-model="form.password" label="Password" color="secondary" />
        <q-btn label="signin" color="secondary" />
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { LoginDetails } from 'components/models';

  const form = ref<LoginDetails>({
    username: '',
    password: '',
  });

</script>
