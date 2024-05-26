<template>
  <q-page padding>
    <!-- content -->
    <div class="column q-gutter-y-md">
      <div class="row items-center">
        <div class="col-12 col-md-4">
          <q-btn :to="{ name: 'membership' }" flat icon="mdi-arrow-left" label="Back" textColor="secondary" />
        </div>
        <div class="col-12 col-md-8">
          <h1 class="text-h6">New Member</h1>
        </div>
      </div>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <span class="text-h6">Member Details</span>
        <div class="row items-center">
          <q-input filled v-model="text" label="First Name" class="col q-mr-md" />
          <q-input filled v-model="text" label="Last Name" class="col" />
        </div>

        <div class="row items-center">
          <q-input type="email" filled v-model="text" label="E-mail" class="col q-mr-md" />
          <q-input type="number" filled v-model="text" label="Phone Number" class="col" />
        </div>

        <div class="row items-center">
          <q-input type="date" filled v-model="text" label="Date of Birth" class="col q-mr-md" />
          <q-select filled v-model="model" :options="options" label="Select gender" class="col" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Address Details</span>

        <div class="row items-center">
          <q-input filled v-model="text" label="Address" class="col q-mr-md" />
          <q-input filled v-model="text" label="City" class="col" />
        </div>

        <div class="row items-center">
          <q-input filled v-model="text" label="Provice" class="col q-mr-md" />
          <q-input filled v-model="text" label="Zipcode" class="col" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Emergency Contact</span>

        <div class="row items-center">
          <q-input filled v-model="text" label="Fullname" class="col q-mr-md" />
          <q-input filled v-model="text" label="Relationship" class="col q-mr-md" />
          <q-input filled v-model="text" label="Phone Number" class="col" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Package</span>
        <div class="row q-mb-lg">
          <q-select filled v-model="model" :options="packages" label="Select package" class="col-12 col-md-3" />
        </div>

        <!-- Sample validation -->
        <!-- <q-input -->
        <!--   filled -->
        <!--   v-model="name" -->
        <!--   label="Your name *" -->
        <!--   hint="Name and surname" -->
        <!--   lazy-rules -->
        <!--   :rules="[ val => val && val.length > 0 || 'Please type something']" -->
        <!-- /> -->
        <!---->
        <!-- <q-input -->
        <!--   filled -->
        <!--   type="number" -->
        <!--   v-model="age" -->
        <!--   label="Your age *" -->
        <!--   lazy-rules -->
        <!--   :rules="[ -->
        <!--     val => val !== null && val !== '' || 'Please type your age', -->
        <!--     val => val > 0 && val < 100 || 'Please type a real age' -->
        <!--   ]" -->
        <!-- /> -->

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Notify } from 'quasar';

  const options = ref(['Male','Female','Other'])
  const packages = ref(['Basic','Standard','Premium'])

  const model = ref(null);
  const name = ref(null);
  const age = ref(null);
  const accept = ref(false);

  const onSubmit = () => {
    if (accept.value !== true) {
      Notify.create({
        position: 'top-right',
        color: 'red-5',
        textColor: 'white',
        icon: 'mdi-alert',
        message: 'You need to accept the license and terms first'
      })
    } else {
      Notify.create({
        position: 'top-right',
        color: 'green-4',
        textColor: 'white',
        icon: 'mdi-cloud-check-outline',
        message: 'Submitted'
      })
    }
  }

  const onReset = () => {
    name.value = null;
    age.value = null;
    accept.value = false;
  }
</script>
