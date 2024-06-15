<template>
  <div v-if="!Platform.is.mobile" class="full-height column items-center q-pa-xl">
    <span class="text-h5 text-weight-normal text-uppercase q-mb-xl">choose your plan</span>
    <div class="row row-wrap q-gutter-xl full-width">
      <ChoosePlansCard v-for="item in packages" :key="item.id" v-bind="item" />
    </div>
  </div>

  <div v-else class="full-height column items-center q-pa-lg">
    <span class="text-h6 text-weight-normal text-uppercase">choose your plan</span>
    <div class="column items-center full-width q-gutter-y-xl">
      <ChoosePlansCardMobile v-for="item in packages" :key="item.id" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { api } from 'boot/axios';
  import { debounce, Platform } from 'quasar';

  import { PackageForSelectWrapper } from 'src/types/package.type';
  import ChoosePlansCard from 'components/ChoosePlansCard.vue';
  import ChoosePlansCardMobile from 'components/ChoosePlansCardMobile.vue';

  const packages = ref<PackageForSelectWrapper>([]);

  const get_packages = debounce(async () => {
    packages.value = [];
    try {
      const response = await api.get('/package/get/0');
      packages.value = response.data.result;
      console.log(packages.value);
    } catch (error: any) {
      throw error.message;
    }
  }, 1000);

  onMounted(async () => {
    await get_packages();
  })
</script>
