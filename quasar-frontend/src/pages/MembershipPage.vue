<template>
  <q-page padding>
    <!-- content -->
    <div class="row items-center">
      <div class="col-12 col-md-4">
        <q-btn :to="{ name: 'new' }" flat label="New Member" icon="mdi-plus" text-color="secondary" />
      </div>
      <div class="col-12 col-md-8">
        <q-input color="secondary" label-color="secondary" dense rounded outlined v-model="text" label="Search...">
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" color="secondary" />
          </template>
        </q-input>
      </div>
    </div>

    <q-separator class="q-my-lg"/>

    <div class="row q-gutter-xl">
      <MembersCard v-for="member in members" :key="member.id" v-bind="member" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import MembersCard from 'components/MembersCard.vue';
  import { IMembers } from 'components/models';

  const text = ref('');
  const tab = ref('members');
  const members = ref<IMembers[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phoneNumber: '987-654-3210'
      },
      membershipType: 'Premium',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      isActive: true
    },
    {
      id: 2,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      phoneNumber: '456-789-0123',
      address: '456 Oak St',
      city: 'Othertown',
      state: 'NY',
      zipCode: '67890',
      dateOfBirth: '1985-10-20',
      gender: 'Female',
      emergencyContact: {
        name: 'Bob Smith',
        relationship: 'Sibling',
        phoneNumber: '234-567-8901'
      },
      membershipType: 'Standard',
      startDate: '2022-02-15',
      endDate: '2023-02-14',
      isActive: false
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phoneNumber: '789-012-3456',
      address: '789 Maple Ave',
      city: 'Anothertown',
      state: 'TX',
      zipCode: '54321',
      dateOfBirth: '1988-07-08',
      gender: 'Male',
      emergencyContact: {
        name: 'Sarah Johnson',
        relationship: 'Parent',
        phoneNumber: '345-678-9012'
      },
      membershipType: 'Basic',
      startDate: '2022-03-10',
      endDate: '2023-03-09',
      isActive: true
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      phoneNumber: '012-345-6789',
      address: '987 Elm St',
      city: 'Smalltown',
      state: 'FL',
      zipCode: '98765',
      dateOfBirth: '1995-12-25',
      gender: 'Female',
      emergencyContact: {
        name: 'David Brown',
        relationship: 'Parent',
        phoneNumber: '890-123-4567'
      },
      membershipType: 'Premium',
      startDate: '2022-04-20',
      endDate: '2023-04-19',
      isActive: true
    },
    {
      id: 5,
      firstName: 'Christopher',
      lastName: 'Lee',
      email: 'christopher.lee@example.com',
      phoneNumber: '345-678-9012',
      address: '345 Pine St',
      city: 'Villagetown',
      state: 'CA',
      zipCode: '45678',
      dateOfBirth: '1993-03-30',
      gender: 'Male',
      emergencyContact: {
        name: 'Jennifer Lee',
        relationship: 'Sibling',
        phoneNumber: '567-890-1234'
      },
      membershipType: 'Standard',
      startDate: '2022-05-15',
      endDate: '2023-05-14',
      isActive: true
    },
    {
      id: 6,
      firstName: 'Samantha',
      lastName: 'Taylor',
      email: 'samantha.taylor@example.com',
      phoneNumber: '567-890-1234',
      address: '567 Cedar St',
      city: 'Largetown',
      state: 'IL',
      zipCode: '23456',
      dateOfBirth: '1997-08-18',
      gender: 'Female',
      emergencyContact: {
        name: 'Mark Taylor',
        relationship: 'Parent',
        phoneNumber: '678-901-2345'
      },
      membershipType: 'Basic',
      startDate: '2022-06-25',
      endDate: '2023-06-24',
      isActive: true
    },
    {
      id: 7,
      firstName: 'Daniel',
      lastName: 'Martinez',
      email: 'daniel.martinez@example.com',
      phoneNumber: '678-901-2345',
      address: '678 Walnut St',
      city: 'Hometown',
      state: 'WA',
      zipCode: '34567',
      dateOfBirth: '1991-11-12',
      gender: 'Male',
      emergencyContact: {
        name: 'Maria Martinez',
        relationship: 'Parent',
        phoneNumber: '789-012-3456'
      },
      membershipType: 'Premium',
      startDate: '2022-07-10',
      endDate: '2023-07-09',
      isActive: false
    },
    {
      id: 8,
      firstName: 'Jessica',
      lastName: 'Nguyen',
      email: 'jessica.nguyen@example.com',
      phoneNumber: '890-123-4567',
      address: '890 Oak St',
      city: 'Distanttown',
      state: 'OR',
      zipCode: '12345',
      dateOfBirth: '1994-04-05',
      gender: 'Female',
      emergencyContact: {
        name: 'David Nguyen',
        relationship: 'Parent',
        phoneNumber: '901-234-5678'
      },
      membershipType: 'Standard',
      startDate: '2022-08-20',
      endDate: '2023-08-19',
      isActive: true
    },
    {
      id: 9,
      firstName: 'Matthew',
      lastName: 'Garcia',
      email: 'matthew.garcia@example.com',
      phoneNumber: '901-234-5678',
      address: '901 Maple St',
      city: 'Suburbantown',
      state: 'MI',
      zipCode: '23456',
      dateOfBirth: '1996-09-27',
      gender: 'Male',
      emergencyContact: {
        name: 'Emily Garcia',
        relationship: 'Parent',
        phoneNumber: '012-345-6789'
      },
      membershipType: 'Basic',
      startDate: '2022-09-05',
      endDate: '2023-09-04',
      isActive: true
    },
    {
      id: 10,
      firstName: 'Lauren',
      lastName: 'Robinson',
      email: 'lauren.robinson@example.com',
      phoneNumber: '234-567-8901',
      address: '234 Cedar St',
      city: 'Ruraltown',
      state: 'TX',
      zipCode: '34567',
      dateOfBirth: '1999-02-14',
      gender: 'Female',
      emergencyContact: {
        name: 'Tyler Robinson',
        relationship: 'Parent',
        phoneNumber: '345-678-9012'
      },
      membershipType: 'Premium',
      startDate: '2022-10-15',
      endDate: '2023-10-14',
      isActive: true
    }
  ])
</script>
