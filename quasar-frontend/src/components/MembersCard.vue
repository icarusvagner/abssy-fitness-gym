<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>

<template>
    <q-card class="my-card bg-grey-12" bordered>
      <div class="column q-pa-md">

        <div class="row">
          <span class="col"> First Name: </span>
          <span class="col capitalize"> {{ props.firstName }} </span>
        </div>

        <div class="row">
          <span class="col"> Last Name: </span>
          <span class="col text-capitalize"> {{ props.lastName }} </span>
        </div>

        <div class="row">
          <span class="col"> Phone Number: </span>
          <span class="col"> {{ props.phoneNumber }} </span>
        </div>

        <div class="row">
          <span class="col"> Address: </span>
          <span class="col ellipsis"> {{ props.address }} </span>
        </div>

        <div class="row">
          <span class="col"> Gender: </span>
          <span class="col"> {{ props.gender }} </span>
        </div>

        <div class="row">
          <span class="col"> Membership Type: </span>
          <span class="col ellipsis"> {{ props.membershipType }} </span>
        </div>

      </div>

      <q-card-actions align="right">
        <q-btn flat round color="teal" icon="mdi-information-variant-circle-outline" />
      </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
  import { IMembers } from './models';

  const props = defineProps<IMembers>();
</script>
