<template>
  <div v-if="props.status !== 'removed'" class="column items-center shadow-10" style="border-radius: 13px 13px 75px 13px; border: 2px solid #408062; padding-bottom: 120px; overflow: hidden; width: 250px;">
    <div class="full-width q-pa-md text-h5 text-weight-bold text-dark bg-secondary text-center text-capitalize">{{ props.package_name }}</div>
    <div class="column items-center q-pa-md q-gutter-y-lg">
      <div class="column q-gutter-y-sm items-center">
        <span class="text-body1 text-weight-normal">Billed Monthly</span>
        <div class="row items-center">
          <span class="text-body1 text-weight-normal text-secondary q-mr-xs">{{ `${props.duration} ${props.package_type}`}}</span>
          <span class="text-body1 text-weight-normal">Validity</span>
        </div>
      </div>
      <div class="row items-center">
        <p class="text-h4 text-primary text-weight-bold q-ma-none">{{ props.price }}</p>
        <span class="text-grey-9 text-weight-normal text-body1">/{{ props.package_type.split('s')[0] }}</span>
      </div>
      <q-btn color="secondary" label="pay now" rounded class="col full-width q-px-md q-py-sm" />
      <span class="text-body1 text-weight-normal text-center">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</span>
    </div>
    <div class="column q-gutter-y-md full-width q-pa-md">
      <span class="text-h6 text-weight-bold text-left">Plan Features:</span>
        <small v-for="(item, index) in props.benefits.split(',')" :key="index" class="text-subtitle1" >
        <q-icon name="mdi-check-bold" />
          {{ item }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PackageForSelect } from 'src/types/package.type';

  const props = defineProps<{
    id: number;
    package_name: string;
    duration: number;
    package_type: string;
    price: string;
    benefits: string;
    status: string;
    ctime: string;
  }>()

</script>
