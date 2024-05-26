<template>
  <q-page padding>
    <!-- content -->
    <div class="column q-gutter-y-md">
      <div class="row items-center">
        <div class="col-12 col-md-4">
          <q-btn :to="{ name: 'membership' }" flat icon="mdi-arrow-left" label="Back" textColor="secondary" />
        </div>
        <div class="col-12 col-md-8">
          <h1 class="text-h6">Member Information Details</h1>
        </div>
      </div>
      <div class="q-gutter-md">
        <span class="text-h6">Member Details</span>
        <div class="row items-center">
          <q-input readonly filled v-model="text" label="First Name" class="col q-mr-md" />
          <q-input readonly filled v-model="text" label="Last Name" class="col" />
        </div>

        <div class="row items-center">
          <q-input readonly type="email" filled v-model="text" label="E-mail" class="col q-mr-md" />
          <q-input readonly type="number" filled v-model="text" label="Phone Number" class="col" />
        </div>

        <div class="row items-center">
          <q-input readonly type="date" filled v-model="text" label="Date of Birth" class="col q-mr-md" />
          <q-select readonly filled v-model="model" :options="options" label="Select gender" class="col" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Address Details</span>

        <div class="row items-center">
          <q-input readonly filled v-model="text" label="Address" class="col q-mr-md" />
          <q-input readonly filled v-model="text" label="City" class="col" />
        </div>

        <div class="row items-center">
          <q-input readonly filled v-model="text" label="Provice" class="col q-mr-md" />
          <q-input readonly filled v-model="text" label="Zipcode" class="col" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Emergency Contact</span>

        <div class="row items-center">
          <q-input readonly filled v-model="text" label="Fullname" class="col q-mr-md" />
          <q-input readonly filled v-model="text" label="Relationship" class="col q-mr-md" />
          <q-input readonly filled v-model="text" label="Phone Number" class="col" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Package</span>
        <div class="row q-mb-lg">
          <q-select readonly filled v-model="model" :options="packages" label="Select package" class="col-12 col-md-3" />
        </div>

        <!-- Sample validation -->
        <!-- <q-input readonly -->
        <!--   filled -->
        <!--   v-model="name" -->
        <!--   label="Your name *" -->
        <!--   hint="Name and surname" -->
        <!--   lazy-rules -->
        <!--   :rules="[ val => val && val.length > 0 || 'Please type something']" -->
        <!-- /> -->
        <!---->
        <!-- <q-input readonly -->
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

        <div>
          <q-btn label="Renew" no-caps color="secondary" @click="diag = true" />
          <q-btn label="Unenroll" no-caps color="dark" flat class="q-ml-sm" @click="remove = true" />
        </div>

        <q-dialog v-model="diag" persistent>
          <q-card>
            <q-card-section class="column q-gutter-md">
              <div class="row items-center">
                <q-avatar icon="mdi-dumbbell" color="secondary" text-color="white" />
                <span class="q-ml-sm">Select a package to renew</span>
              </div>
              <q-select filled v-model="model" :options="packages" label="Select package" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="grey-9" v-close-popup />
              <q-btn flat label="Save changes" color="secondary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="remove" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="mdi-delete-alert-outline" color="red-4" text-color="white" />
              <span class="q-ml-sm">Are you sure you want to remove this member?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="grey-9" v-close-popup />
              <q-btn flat label="Remove" color="red-5" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const model = ref(null);
  const diag = ref(false);
  const remove = ref(false);
  const packages = ref(['Basic','Standard','Premium']);

</script>
