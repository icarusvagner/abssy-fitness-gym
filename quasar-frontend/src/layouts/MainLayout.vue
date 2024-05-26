<template>
  <q-layout view="lHh LpR lFf">

    <q-header elevated class="bg-grey-10 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Abs Mini Gym
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-grey-10 column q-pa-md" behavior="desktop" >
      <!-- drawer content -->
        <q-btn class="q-mb-md" @click="changeRoute('dashboard')" :ripple="{ center: true }" :color="routeName === 'dashboard' ? 'secondary' : 'grey-8'" label="Dashboard" no-caps icon="mdi-view-dashboard-outline" />
        <q-btn class="q-mb-md" @click="changeRoute('membership')" :ripple="{ center: true }" :color="router.currentRoute.value.name === 'membership' || routeName === 'new_member' || routeName === 'one' ? 'secondary' : 'grey-8'" label="Membership" no-caps icon="mdi-account-group-outline" />
        <q-btn class="q-mb-md" @click="changeRoute('staff')" :ripple="{ center: true }" :color="routeName === 'staff' || routeName === 'new_staff' ? 'secondary' : 'grey-8'" label="Staffs" no-caps icon="mdi-account-lock-outline" />
        <q-btn class="q-mb-md" @click="changeRoute('trainer')" :ripple="{ center: true }" :color="routeName === 'trainer' || routeName === 'new_trainer' ? 'secondary' : 'grey-8'" label="Trainers" no-caps icon="mdi-dumbbell" />
        <q-btn class="q-mb-md" @click="changeRoute('sales')" :ripple="{ center: true }" :color="routeName === 'sales' ? 'secondary' : 'grey-8'" label="Sales Report" no-caps icon="mdi-chart-pie-outline" />
        <q-btn class="q-mb-md" @click="changeRoute('inventory')" :ripple="{ center: true }" :color="routeName === 'inventory' ? 'secondary' : 'grey-8'" label="Inventory" no-caps icon="mdi-package-variant" />
        <q-btn class="q-mb-md" @click="changeRoute('package')" :ripple="{ center: true }" :color="routeName === 'package' ? 'secondary' : 'grey-8'" label="Packages" no-caps icon="mdi-list-box-outline" />
        <q-btn class="q-mb-md" @click="changeRoute('announcement')" :ripple="{ center: true }" :color="routeName === 'announcement' ? 'secondary' : 'grey-8'" label="Announcements" no-caps icon="mdi-bullhorn-variant-outline" />
        <q-btn :ripple="{ center: true }" color="grey-8" label="Sign Out" no-caps class="q-mt-xl" icon="mdi-logout" />
    </q-drawer>

    <q-page-container class="bg-grey-4">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router';

  const routeName = ref('');
  const router = useRouter()
  const leftDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const changeRoute = (name: string) => {
    router.push({ name })
  }

  watchEffect(() => {
    routeName.value = router.currentRoute.value.name;
  });
</script>
