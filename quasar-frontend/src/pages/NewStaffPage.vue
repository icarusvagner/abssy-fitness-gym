<template>
  <q-page padding>
    <!-- content -->
    <div class="column q-gutter-y-md">
      <div class="row items-center">
        <div class="col-12 col-md-4">
          <q-btn
            @click="router.go(-1)"
            flat
            icon="mdi-arrow-left"
            label="Back"
            textColor="secondary"
          />
        </div>
        <div class="col-12 col-md-8">
          <h1 class="text-h6">Add Staff</h1>
        </div>
      </div>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <span class="text-h6">Staff Details</span>
        <div class="row items-center">
          <q-input
            filled
            v-model="form.first_name"
            label="First Name"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter staff first name']"
          />
          <q-input
            filled
            v-model="form.middle_name"
            label="Middle Name"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter staff middle name']"
          />
          <q-input
            filled
            v-model="form.last_name"
            label="Last Name"
            class="col"
            :rules="[(val) => !!val || 'Enter staff last name']"
          />
        </div>

        <div class="row items-center">
          <q-input
            filled
            v-model="form.phone_number"
            label="Phone Number"
            class="col q-mr-md"
            :rules="[
              (val) => !!val || 'Enter phone number',
              (val) =>
                validatePhoneNumber(val) ||
                'Mobile/Telephone number is invalid',
            ]"
          />
          <q-input
            type="email"
            filled
            v-model="form.email_address"
            label="E-mail"
            class="col"
            :rules="[
              (val) => !!val || 'Enter email address',
              (val) => validateEmailAddress(val) || 'Email address is invalid',
            ]"
          />
        </div>

        <div class="row items-center">
          <q-input
            type="date"
            filled
            v-model="form.date_of_birth"
            label="Date of Birth"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter date of birth']"
          />
          <q-select
            filled
            v-model="form.gender"
            :options="options"
            label="Select gender"
            class="col"
            :rules="[(val) => !!val || 'Select gender']"
          />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Address Details</span>

        <div class="row items-center">
          <q-input
            filled
            v-model="form.street"
            label="Street"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter street address']"
          />
          <q-input
            filled
            v-model="form.brgy"
            label="Brgy"
            class="col"
            :rules="[(val) => !!val || 'Enter brgy address']"
          />
        </div>

        <div class="row items-center">
          <q-input
            filled
            v-model="form.city"
            label="City"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter city']"
          />
          <q-input
            filled
            v-model="form.provine"
            label="Province"
            class="col"
            :rules="[(val) => !!val || 'Enter province']"
          />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Emergency Contact</span>

        <div class="row items-center">
          <q-input
            filled
            v-model="form.ec_first_name"
            label="First name"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter first name']"
          />
          <q-input
            filled
            v-model="form.ec_last_name"
            label="Last name"
            class="col"
            :rules="[(val) => !!val || 'Enter last name']"
          />
        </div>

        <div class="row items-center">
          <q-input
            filled
            v-model="form.relationship"
            label="Relationship"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter relationship']"
          />
          <q-input
            filled
            v-model="form.ec_phone_number"
            label="Phone Number"
            class="col"
            :rules="[
              (val) => !!val || 'Enter phone number',
              (val) =>
                validatePhoneNumber(val) ||
                'Mobile/Telephone number in invalid',
            ]"
          />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Login Credentials</span>

        <div class="row items-center">
          <q-input
            filled
            v-model="form.username"
            suffix=".staff"
            label="Username"
            class="col q-mr-md text-right"
            :rules="[(val) => !!val || 'Enter username']"
          />
          <q-input
            filled
            v-model="form.password"
            label="Password"
            class="col"
            type="password"
            :rules="[(val) => !!val || 'Enter password']"
          />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Position & Schedule</span>

        <div class="row items-center">
          <q-select
            label="Shift Schedule"
            filled
            v-model="scheds"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            class="col q-mr-md"
            :rules="[(val) => !!val || 'Enter shift schedule']"
          />
          <q-select
            filled
            v-model="form.role"
            :options="staff_rol"
            label="Select position"
            class="col"
            :rules="[(val) => !!val || 'Select position']"
          />
        </div>
        <q-toggle
          v-model="accept"
          label="I accept the license and terms"
          class="col q-mr-md"
        />

        <div>
          <q-btn
            label="Submit"
            type="submit"
            color="secondary"
            :disabled="isSubmit"
          />
          <q-btn label="Reset" type="reset" color="dark" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

import { StaffForCreate } from 'src/types/user.type';
import StaffService from 'src/services/staff.service';
import {
  validatePhoneNumber,
  validateEmailAddress,
} from 'src/utils/validator.util';

const options = ref(['male', 'female', 'other']);
const staff_rol = ref([
  'receptionist',
  'cleaner',
  'encoder',
  'maintenance',
  'attendant',
  'officer',
  'childcare',
  'dietitian',
  'consultant',
  'instructor',
  'manager',
]);
const scheds = ref(null);
const staffService = new StaffService();
const router = useRouter();
const isSubmit = ref(false);

const accept = ref(false);
const form = ref<StaffForCreate>({
  first_name: '',
  middle_name: '',
  last_name: '',
  phone_number: '',
  email_address: '',
  date_of_birth: '',
  gender: '',
  street: '',
  brgy: '',
  city: '',
  provine: '',
  ec_first_name: '',
  ec_last_name: '',
  relationship: '',
  ec_phone_number: '',
  username: '',
  password: '',
  role: '',
  shift_schedule: '',
});

const onSubmit = () => {
  form.value.shift_schedule = scheds.value.join(', ');
  form.value.username = `${form.value.username}.staff`;
  if (accept.value !== true) {
    Notify.create({
      position: 'top-right',
      color: 'red-5',
      textColor: 'white',
      icon: 'mdi-alert',
      message: 'You need to accept the license and terms first',
    });
  } else {
    staffService.create(form.value).then((res) => {
      if (res.result.status === 201) {
        isSubmit.value = true;

        Notify.create({
          position: 'top-right',
          color: 'green-4',
          textColor: 'white',
          icon: 'mdi-cloud-check-outline',
          message: 'Staff is registered',
        });

        router.push({ name: 'staff' });
      } else {
        Notify.create({
          position: 'top-right',
          color: 'red-5',
          textColor: 'white',
          icon: 'mdi-alert',
          message: res.error,
        });
      }
    });
  }
};

const onReset = () => {
  accept.value = false;
};
</script>
