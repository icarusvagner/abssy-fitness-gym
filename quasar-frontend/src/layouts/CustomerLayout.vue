<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png" />
          </q-avatar>
          ABBSY Fitness GYM
        </q-toolbar-title>
        <div class="row q-gutter-x-md">
          <q-btn
            outline
            style="color: gold"
            label="Upgrade Package"
            :to="{
              name: 'choose_plan',
              query: {
                q: 'upgrade',
                member_id: details.member_id,
                email: details.email_address,
              },
            }"
          />
          <q-btn flat label="Home" :to="{ name: 'dashboard' }" />
          <q-btn flat color="white" label="Logout" @click="logout_handler" />
        </div>
      </q-toolbar>
      <div
        v-if="Platform.is.mobile"
        class="row q-gutter-x-md q-pl-lg q-pb-md q-pt-md items-center justify-center"
      >
        <q-btn flat color="white" label="Logout" @click="logout_handler" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Platform, debounce } from 'quasar';
import { useRouter } from 'vue-router';
import useAuthStore from 'stores/auth-store';

import MemberService from 'src/services/member.service';
import { OneMemberPackage } from 'src/types/member.type';

const router = useRouter();
const authStore = useAuthStore();
const details = ref<OneMemberPackage>({
  address: '',
  benefits: '',
  duration: 0,
  first_name: '',
  last_name: '',
  member_id: 0,
  middle_name: '',
  package_id: 0,
  package_name: '',
  package_type: '',
  phone_number: '',
  price: '',
});

const memberService = new MemberService();
const logout_handler = async () => {
  await authStore.LogoutUser();
  router.push({ name: 'login' });
};

const get_my_details = debounce(() => {
  memberService
    .get_one()
    .then((res) => {
      details.value = res.result;
    })
    .catch((error: any) => {
      throw error;
    });
}, 1000);

onBeforeMount(() => {
  get_my_details();
});
</script>
