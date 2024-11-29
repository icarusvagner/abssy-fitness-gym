<template>
  <div
    v-if="is_loading"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100dvh;
    "
  >
    <div class="column">
      <q-spinner-cube size="15em" color="secondary" />
    </div>
  </div>

  <div v-else>
    <div
      v-if="!Platform.is.mobile"
      class="full-height column items-center q-pa-xl"
    >
      <span class="text-h5 text-weight-normal text-uppercase q-mb-xl"
        >choose your plan</span
      >
      <div class="row row-wrap q-gutter-xl full-width">
        <ChoosePlansCard
          v-for="item in packages"
          :key="item.id"
          v-bind="item"
        />
      </div>
    </div>

    <div v-else class="full-height column items-center q-pa-lg">
      <span class="text-h6 text-weight-normal text-uppercase"
        >choose your plan</span
      >
      <div class="column items-center full-width q-gutter-y-xl">
        <ChoosePlansCardMobile
          v-for="item in packages"
          :key="item.id"
          v-bind="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { api } from 'boot/axios';
import { debounce, Platform } from 'quasar';

import { PackageForSelectWrapper } from 'src/types/package.type';
import LoadersComponent from 'components/LoadersComponent.vue';

const ChoosePlansCardMobile = defineAsyncComponent({
  loader: () => import('components/ChoosePlansCardMobile.vue'),
  loadingComponent: LoadersComponent,
  delay: 500,
  timeout: 3000,
});
const ChoosePlansCard = defineAsyncComponent({
  loader: () => import('components/ChoosePlansCard.vue'),
  loadingComponent: LoadersComponent,
  delay: 500,
  timeout: 3000,
});

const packages = ref<PackageForSelectWrapper>([]);
const is_loading = ref(false);

const get_packages = debounce(async () => {
  packages.value = [];
  try {
    const response = await api.get('/package/get/0');
    packages.value = response.data.result;
    is_loading.value = false;
  } catch (error: any) {
    throw error.message;
  }
}, 1000);

onMounted(() => {
  is_loading.value = true;
  get_packages();
});
</script>
