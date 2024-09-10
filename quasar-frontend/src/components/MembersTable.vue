<template>
  <q-table
    bordered
    title="Members"
    :rows="rows"
    :columns="columns"
    row-key="fullname"
    :filter="filter"
    card-class="bg-grey-12 text-grey-10 text-capitalize"
    :loading="isLoading"
  >
    <template v-slot:body-cell="props">
      <q-td
        :props="props"
        @click="onItemClick(props.row)"
        class="cursor-pointer"
      >
        {{ props.value }}
      </q-td>
    </template>

    <template v-slot:loading>
      <q-inner-loading showing color="secondary" />
    </template>

    <template v-slot:top-right>
      <q-input
        outlined
        rounded
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>

  <q-dialog
    v-model="memberInfo"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-4 text-grey-9">
      <q-bar>
        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-secondary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-gutter-y-md">
        <div class="full-width q-gutter-y-md">
          <span class="text-h6 q-mx-md">Information</span>
          <hr class="q-ml-md" />
          <div class="full-width row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="member_detail.first_name"
              label="First name"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.middle_name"
              label="Middle name"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.last_name"
              label="Last name"
              dense
              readonly
            />
          </div>
          <div class="full-width row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="member_detail.gender"
              label="Gender"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.email_address"
              label="Email address"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.phone_number"
              label="Phone number"
              dense
              readonly
            />
          </div>
        </div>

        <div class="full-width q-gutter-y-sm">
          <span class="text-h6 q-mx-md">Address</span>
          <hr class="q-ml-md" />
          <div class="full-width row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="member_detail.address_street"
              label="Street"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.address_brgy"
              label="Barangay"
              dense
              readonly
            />
          </div>
          <div class="full-width row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="member_detail.address_city"
              label="City"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.address_province"
              label="Province"
              dense
              readonly
            />
          </div>
        </div>

        <div class="full-width q-gutter-y-sm">
          <span class="text-h6 q-mx-md">Emergency Contact</span>
          <hr class="q-ml-md" />
          <div class="full-width row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="member_detail.ec_first_name"
              label="First name"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.ec_last_name"
              label="Last name"
              dense
              readonly
            />
          </div>
          <div class="full-width row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="member_detail.ec_phone_number"
              label="Phone number"
              dense
              readonly
            />
            <q-input
              outlined
              class="col"
              v-model="member_detail.ec_relationship"
              label="Relationship"
              dense
              readonly
            />
          </div>
        </div>
        <div class="q-ml-md">
          <q-btn color="primary" label="Accept membership" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { debounce } from 'quasar';

import MemberService from 'src/services/member.service';
import { MemberForSelectWrapper, MemberForSelect } from 'src/types/member.type';

const memberInfo = ref(false);
const memberService = new MemberService();
const member_detail = ref<MemberForSelect>();
const filter = ref('');
const isLoading = ref(false);
const columns = ref([
  {
    name: 'fullname',
    required: true,
    label: 'Fullname',
    align: 'left',
    field: (row) => `${row.first_name} ${row.middle_name} ${row.last_name}`,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'address',
    align: 'left',
    label: 'Address',
    field: (row) =>
      `${row.address_street}, ${row.address_brgy}, ${row.address_city}, ${row.address_province}`,
    sortable: true,
  },
  {
    name: 'email',
    align: 'right',
    label: 'Email Address',
    field: 'email_address',
    sortable: true,
  },
  {
    name: 'phone_number',
    align: 'right',
    label: 'Phone/Mobile Number',
    field: 'phone_number',
    sortable: true,
  },
  {
    name: 'status',
    align: 'right',
    label: 'Membership Status',
    field: 'member_status',
  },
]);

const rows = ref<MemberForSelectWrapper[]>([]);

const get_members = debounce(() => {
  rows.value = [];
  memberService.get(0).then((res) => {
    rows.value = res.result;
    isLoading.value = false;
    console.log(rows.value);
  });
}, 1200);

const onItemClick = (row) => {
  member_detail.value = row;
  console.log(member_detail.value);
  memberInfo.value = true;
};

onMounted(async () => {
  isLoading.value = true;
  get_members();
});
</script>
