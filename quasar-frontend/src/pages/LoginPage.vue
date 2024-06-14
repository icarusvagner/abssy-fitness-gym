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
      <q-form @submit.prevent="login_handler" class="column q-gutter-md">
        <span class="text-h5 text-left">Sign in to your account</span>
        <q-input
          outlined
          v-model="form.username"
          label="Username"
          color="secondary"
          :rules="[
            val => !!val || 'Username required',
          ]"
        />
        <q-input
          outlined
          v-model="form.password"
          label="Password"
          :type="!isPwd ? 'password' : 'text'"
          color="secondary"
          :rules="[
            val => !!val || 'Password required'
          ]"
        >
          <template v-slot:append>
            <q-icon class="cursor-pointer" :name="isPwd ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-btn type="submit" label="signin" color="secondary" />
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Notify } from 'quasar';

  import { LoginDetails } from 'components/models';
  import useAuthStore from 'stores/auth-store';

  const router = useRouter();
  const isPwd = ref(false);
  const isLoading = ref(false);
  const authStore = useAuthStore();
  const form = ref<LoginDetails>({
    username: '',
    password: '',
  });

  const login_handler = async () => {
    isLoading.value = true;
    const result: any = await authStore.LoginUser(form.value);
    if (result.error) {
      Notify.create({
        message: result.error,
        position: 'top-right',
        icon: 'mdi-exclamation-thick',
        color: 'negative'
      });
    } else if (result.status === 200) {
      router.push({ name: 'dashboard'})
    } else {
       Notify.create({
        message: result.message,
        position: 'top-right',
        icon: 'mdi-exclamation-thick',
        color: 'negative'
      });
    }
    isLoading.value = false;
  }
</script>
