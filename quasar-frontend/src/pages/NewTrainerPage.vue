<template>
  <q-page padding>
    <!-- content -->
    <div class="column q-gutter-y-md">
      <div class="row items-center">
        <div class="col-12 col-md-4">
          <q-btn @click="router.go(-1)" flat icon="mdi-arrow-left" label="Back" textColor="secondary" />
        </div>
        <div class="col-12 col-md-8">
          <h1 class="text-h6">New Trainer</h1>
        </div>
      </div>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <span class="text-h6">Trainer Details</span>
        <div class="row items-center">
          <q-input filled v-model="form.first_name" label="First Name" class="col q-mr-md" :rules="[ val => !!val || 'Enter trainer first name' ]" />
          <q-input filled v-model="form.middle_name" label="Middle Name" class="col q-mr-md" :rules="[ val => !!val || 'Enter trainer middle name' ]" />
          <q-input filled v-model="form.last_name" label="Last Name" class="col" :rules="[ val => !!val || 'Enter trainer last name' ]" />
        </div>

        <div class="row items-center">
          <q-input filled v-model="form.phone_number" label="Phone Number" class="col q-mr-md" :rules="[ val => !!val || 'Enter phone number', val => validatePhoneNumber(val) || 'Mobile/Telephone number is invalid' ]" />
          <q-input type="email" filled v-model="form.email_address" label="E-mail" class="col" :rules="[ val => !!val || 'Enter email address', val => validateEmailAddress(val) || 'Email address is invalid']" />
        </div>

        <div class="row items-center">
          <q-input type="date" filled v-model="form.date_of_birth" label="Date of Birth" class="col q-mr-md" :rules="[ val => !!val || 'Enter date of birth' ]" />
          <q-select filled v-model="form.gender" :options="options" label="Select gender" class="col" :rules="[ val => !!val || 'Select gender' ]" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Address Details</span>

        <div class="row items-center">
          <q-input filled v-model="form.street" label="Street" class="col q-mr-md" :rules="[ val => !!val || 'Enter street address' ]" />
          <q-input filled v-model="form.brgy" label="Brgy" class="col" :rules="[ val => !!val || 'Enter brgy address' ]" />
        </div>

        <div class="row items-center">
          <q-input filled v-model="form.city" label="City" class="col q-mr-md" :rules="[ val => !!val || 'Enter city' ]" />
          <q-input filled v-model="form.provine" label="Province" class="col" :rules="[ val => !!val || 'Enter province' ]" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Emergency Contact</span>

        <div class="row items-center">
          <q-input filled v-model="form.ec_first_name" label="First name" class="col q-mr-md" :rules="[ val => !!val || 'Enter first name' ]" />
          <q-input filled v-model="form.ec_last_name" label="Last name" class="col" :rules="[ val => !!val || 'Enter last name' ]" />
        </div>

        <div class="row items-center">
          <q-input filled v-model="form.ec_relationship" label="Relationship" class="col q-mr-md" :rules="[ val => !!val || 'Enter relationship' ]" />
          <q-input filled v-model="form.ec_phone_number" label="Phone Number" class="col" :rules="[ val => !!val || 'Enter phone number', val => validatePhoneNumber(val) || 'Mobile/Telephone number in invalid' ]" />
        </div>

        <q-separator class="q-my-lg" />

        <span class="text-h6">Trainer's stats</span>

        <div class="row items-center">
          <q-input filled v-model="form.specialization" label="Specialization" class="col q-mr-md" :rules="[ val => !!val || 'Enter trainer\'s specialization' ]" />
          <q-select label="Certifications" filled v-model="certs" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" class="col" :rules="[ val => !!val || 'Enter trainer\'s certifications' ]" />
        </div>

        <div class="row items-center">
          <q-input filled v-model="form.experience_years" label="Years experience" class="col q-mr-md" :rules="[ val => !!val || 'Enter years of experience' ]" type="number" min="1" />
          <span class="col" v-if="true"></span>
        </div>

        <div class="row items-center">
          <q-input filled v-model="form.hire_date" label="Hire date" class="col q-mr-md" :rules="[ val => !!val || 'Enter hire date']" type="date" />
          <q-select label="Availability" filled v-model="scheds" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" class="col" :rules="[ val => !!val || 'Enter availability schedule' ]" />
        </div>

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="secondary" :disable="isSubmit" />
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

  import { TrainerForCreate } from 'src/type/trainer.type';
  import { validatePhoneNumber, validateEmailAddress } from 'src/utils/validator.util';
  import TrainerService from 'src/services/trainer.service';

  const trainerService = new TrainerService();
  const options = ref(['male','female','other']);
  const router = useRouter();
  const name = ref(null);
  const age = ref(null);
  const accept = ref(false);
  const isSubmit = ref(false);
  const scheds = ref(null);
  const certs = ref(null);

  const form = ref<TrainerForCreate>({
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
    province: '',
    ec_first_name: '',
    ec_last_name: '',
    ec_relationship: '',
    ec_phone_number: '',
    specialization: '',
    certifications: '',
    experience_years: '',
    hire_date: '',
    availability: '',
  });

  const onSubmit = () => {
    if (accept.value !== true) {
      Notify.create({
        position: 'top-right',
        color: 'red-5',
        textColor: 'white',
        icon: 'mdi-alert',
        message: 'You need to accept the license and terms first'
      });

      return;
    }

    form.value.certifications = certs.value.join(', ');
    form.value.availability = scheds.value.join(', ');
    trainerService.create(form.value).then(res => {
      if (res.result.status === 201) {
        isSubmit.value = true;
        Notify.create({
          position: 'top-right',
          color: 'green-4',
          textColor: 'white',
          icon: 'mdi-cloud-check-outline',
          message: res.result.message
        })
      } else {
        Notify.create({
          position: 'top-right',
          color: 'red-5',
          textColor: 'white',
          icon: 'mdi-cloud-check-outline',
          message: res.error.message,
        })
      }
    })
  }

  const onReset = () => {
    name.value = null;
    age.value = null;
    accept.value = false;
  }
</script>
