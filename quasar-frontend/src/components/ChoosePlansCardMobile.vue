<template>
  <div
    class="column items-center full-width shadow-10"
    style="
      border-radius: 13px 13px 75px 13px;
      border: 2px solid #408062;
      padding-bottom: 120px;
      overflow: hidden;
    "
  >
    <div
      class="full-width q-pa-sm text-h6 text-weight-bold text-dark bg-secondary text-center"
    >
      Basic
    </div>
    <div class="column items-center q-pa-md q-gutter-y-lg">
      <div class="column q-gutter-y-sm items-center">
        <span class="text-body2 text-weight-normal">Billed Monthly</span>
        <div class="row items-center">
          <span class="text-body2 text-weight-normal text-secondary q-mr-xs"
            >3 months</span
          >
          <span class="text-body2 text-weight-normal">Validity</span>
        </div>
      </div>
      <div class="row items-center">
        <p class="text-h6 text-primary text-weight-bold q-ma-none">1300</p>
        <span class="text-grey-9 text-weight-normal text-body1">/mo</span>
      </div>
      <q-btn
        color="secondary"
        size="sm"
        label="pay now"
        rounded
        class="col full-width q-px-md q-py-sm"
      />
      <p class="text-grey-9 text-center">
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </p>
    </div>
    <div class="column q-gutter-y-md full-width q-pa-md">
      <span class="text-body1 text-weight-bold text-left">Plan Features:</span>
      <span class="row items-center">
        <q-icon name="mdi-check-bold" size="16px" />
        <small>Lorem ipsum dolor sit amet.</small>
      </span>
      <span class="row items-center q-gutter-x-xs text-body1">
        <q-icon name="mdi-check-bold" />
        <small>Lorem ipsum dolor sit amet.</small>
      </span>
      <span class="row items-center q-gutter-x-xs text-body1">
        <q-icon name="mdi-check-bold" />
        <small>Lorem ipsum dolor sit amet.</small>
      </span>
      <span class="row items-center q-gutter-x-xs text-body1">
        <q-icon name="mdi-check-bold" />
        <small>Lorem ipsum dolor sit amet.</small>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PackageForSelect } from 'src/types/package.type';
</script>
