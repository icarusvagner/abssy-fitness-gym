<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>

<template>
    <q-card class="my-card bg-grey-12" bordered>
      <div class="column q-pa-md q-gutter-md text-capitalize">

        <div class="column">
          <span class="text-grey-14"> Full Name: </span>
          <span class="capitalize text-grey-10"> {{props.lastName}}, {{ props.firstName }} </span>
        </div>

        <div class="column">
          <span class="text-grey-14"> Phone Number: </span>
          <span class="text-grey-10"> {{ props.phoneNumber }} </span>
        </div>

        <div class="column">
          <span class="text-grey-14"> Address: </span>
          <span class="text-grey-10"> {{ props.address }}, {{ props.city }}, {{ props.state }} </span>
        </div>

        <div class="column">
          <span class="text-grey-14"> Gender: </span>
          <span class="text-grey-10"> {{ props.gender }} </span>
        </div>

        <div class="column">
          <span class="text-grey-14"> Membership Type: </span>
          <span class="text-grey-10"> {{ props.membershipType }} </span>
        </div>

      </div>

      <q-card-actions align="right">
        <q-btn :to="{ name: 'one_member', params: { id: props.id } }" flat round color="teal" icon="mdi-information-variant-circle-outline" />
      </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
  import { IMembers } from './models';

  const props = defineProps<IMembers>();
</script>
