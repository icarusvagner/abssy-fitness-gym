<template>
  <div class="column items-center justify-center window-height q-pa-md">
    <q-form
      @submit.prevent="login_member"
      class="column items-center q-pa-lg shadow-10 q-gutter-y-md"
      style="border-radius: 10px"
    >
      <span class="text-left text-h5">ABBSY Fitness Gym Member Login</span>
      <div class="column q-gutter-y-md full-width q-pb-lg">
        <q-input
          v-model="form.username"
          color="secondary"
          label="Username"
          class="col"
        />
        <q-input
          v-model="form.password"
          color="secondary"
          label="Password"
          type="password"
          class="col"
        />
        <q-btn
          color="secondary"
          :loading="isLoading"
          type="submit"
          label="Signin"
          class="q-mt-lg"
        />
        <q-btn
          flat
          dense
          :to="{ name: 'landing_page' }"
          align="center"
          label="back to homepage"
          size="sm"
          class="q-py-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { debounce, Notify } from 'quasar';
import { ref } from 'vue';
import MemberService from 'src/services/member.service';
import { useRouter } from 'vue-router';
import useAuthStore from 'src/stores/auth-store';

const authStore = useAuthStore();
const router = useRouter();
const memberService = new MemberService();
const isLoading = ref(false);
const form = ref<{
  username: string;
  password: string;
}>({
  username: '',
  password: '',
});

const login_member = debounce(() => {
  isLoading.value = true;
  memberService
    .login_member(form.value)
    .then((res: any) => {
      if (res.result.status !== 200) {
        isLoading.value = false;

        Notify.create({
          message: 'Wrong username or password',
          position: 'top-right',
          icon: 'mdi-exclamation-thick',
          color: 'negative',
        });
        return;
      }
      authStore.setAuthenticated(res.result);
      router.push({ name: 'dashboard' });
    })
    .catch((error) => {
      throw error;
    });
}, 1000);
</script>
