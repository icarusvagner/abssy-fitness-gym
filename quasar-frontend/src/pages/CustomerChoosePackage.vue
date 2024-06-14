<template>
  <div class="full-height column items-center q-pa-xl q-gutter-y-xl">
    <span class="text-h5 text-weight-normal text-uppercase">choose your plan</span>
    <div class="row items-center q-gutter-x-xl">
      <ChoosePlansCard v-for="n in 4" :key="n"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { api } from 'boot/axios';
  import { debounce, Platform } from 'quasar';

  import { PackageForSelectWrapper } from 'src/types/package.type';
  import ChoosePlansCard from 'components/ChoosePlansCard.vue';

  const packages = ref<PackageForSelectWrapper>([]);

  const get_packages = debounce(async () => {
    packages.value = [];
    try {
      const response = await api.get('/package/get/0');
      packages.value = response.data.result;
    } catch (error: any) {
      throw error.message;
    }
  }, 1000);

  onMounted(async () => {
    await get_packages();
  })
</script>
