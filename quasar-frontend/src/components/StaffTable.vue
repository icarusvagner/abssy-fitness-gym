<template>
    <q-table
      ref="tableRef"
      bordered
      title="Staffs"
      :rows="rows"
      :columns="columns"
      row-key="fullname"
      :filter="filter"
      card-class="bg-grey-12 text-grey-10"
      table-class="text-capitalize"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn
          flat
          rounded
          icon-right="archive"
          dense
          no-caps
          @click="exportTable"
          class="q-mr-md"
          binary-state-sort
        >
          <q-tooltip anchor="bottom middle" self="top middle">
            Export table
          </q-tooltip>
        </q-btn>
        <q-input outlined rounded dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template>

      <template v-slot:body-cell-staff_status="props">
        <q-td key="first_name" :props="props">
          <q-badge rounded :color="props.row.staff_status === 'active' ? 'positive' : 'warning'" >
            <q-tooltip anchor="bottom middle" self="top middle">
              {{ props.row.staff_status }}
            </q-tooltip>
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td key="action" :props="props">
          <q-btn flat rounded dense color="secondary" icon="mdi-information-outline" @click="show_staff(props.row)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog
      v-model="medium"
      persistent
    >
      <q-card style="width: 820px; max-width: 80vw;" class="q-pa-md">
        <q-card-section class="row justify-between items-center">
          <div class="text-h6">Staff information</div>
          <q-btn flat dense rounded color="red-5" icon="mdi-trash-can-outline" @click="confirmDelete = !confirmDelete" v-if="selected.staff_status === 'active'">
            <q-tooltip anchor="bottom middle" self="top middle">
              Remove staff account
            </q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pt-none column q-gutter-y-md">
          <div class="row items-center">
            <q-input filled dense v-model="selected.first_name" readonly label="First Name" class="col" />
            <q-input filled dense v-model="selected.middle_name" readonly label="Middle Name" class="col q-mx-md" />
            <q-input filled dense v-model="selected.last_name" readonly label="Last Name" class="col" />
          </div>

          <div class="row items-center">
            <q-input filled dense v-model="selected.phone_number" readonly label="Mobile/Phone number" class="col q-mr-md" />
            <q-input filled dense v-model="selected.email_address" readonly label="Email address" class="col" />
          </div>

          <div class="row items-center">
            <q-input filled dense v-model="selected.date_of_birth" readonly label="Date of Birth" class="col q-mr-md" />
            <q-input filled dense v-model="selected.gender" readonly label="Gender" class="col" />
          </div>

          <div class="column q-gutter-y-sm">
            <span class="text-caption text-weight-normal">Complete address</span>
            <div class="row q-gutter-x-sm">
              <q-input filled dense v-model="selected.address_street" :readonly="isEdit" label="Street" class="col" />
              <q-input filled dense v-model="selected.address_brgy" :readonly="isEdit" label="Baranggay" class="col" />
              <q-input filled dense v-model="selected.address_city" :readonly="isEdit" label="City" class="col" />
              <q-input filled dense v-model="selected.address_province" :readonly="isEdit" label="Province" class="col" />
            </div>
          </div>

          <div class="column q-gutter-y-sm">
            <span class="text-caption text-weight-normal">Emergency contact</span>
            <div class="row q-gutter-x-sm">
              <q-input filled dense v-model="selected.ec_first_name" :readonly="isEdit" label="Street" class="col" />
              <q-input filled dense v-model="selected.ec_last_name" :readonly="isEdit" label="Baranggay" class="col" />
              <q-input filled dense v-model="selected.ec_relationship" :readonly="isEdit" label="City" class="col" />
              <q-input filled dense v-model="selected.ec_phone_number" :readonly="isEdit" label="Province" class="col" />
            </div>
          </div>

          <div class="column q-gutter-y-sm">
            <span class="text-caption text-weight-normal">Employment</span>
            <div class="row q-gutter-x-sm">
              <q-input filled dense v-model="selected.role" :readonly="isEdit" label="Position" class="col" />
              <q-input filled dense v-model="selected.hire_date" :readonly="isEdit" label="Hire date" class="col" />
            </div>
          </div>
          <q-input filled dense bottom-slots v-model="selected.shift_schedule" :readonly="isEdit" label="Shift Schedule" class="col" >
            <template v-slot:hint>
              Comma separated (monday, tuesday, etc)
            </template>
          </q-input>

        </q-card-section>

        <q-card-actions v-if="isEdit" align="right" class="bg-white text-teal">
          <q-btn v-if="selected.staff_status === 'active'" color="secondary" label="edit" @click="isEdit = !isEdit" />
          <q-btn flat label="CLOSE" color="dark" v-close-popup />
        </q-card-actions>

        <q-card-actions v-else align="right" class="bg-white text-teal">
          <q-btn color="secondary" label="Save changes" @click="update_staff" />
          <q-btn flat label="cancel" color="dark" @click="isEdit = !isEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-alert" color="warning" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to remove this?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Confirm" color="positive" @click="delete_staff" />
          <q-btn label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { debounce, exportFile, Notify } from 'quasar';

  import { StaffForSelectWrapper, StaffForSelect } from 'src/types/user.type';
  import StaffService from 'src/services/staff.service';

  const staffService = new StaffService();
  const isLoading = ref(false);
  const filter = ref('');
  const medium = ref(false);
  const selected = ref<StaffForSelect>();
  const isEdit = ref(true);
  const confirmDelete = ref(false);

  const columns = ref([
    { name: 'action', align: 'center', label: 'Action'  },
    { name: 'fullname', required: true, label: 'Fullname', align: 'left', field: row => `${row.first_name} ${row.middle_name.charAt(0).toUpperCase()}. ${row.last_name}`, format: val => `${val}`, sortable: true },
    { name: 'phone_number', align: 'left', label: 'Mobile/Phone Number', field: 'phone_number', sortable: true },
    { name: 'email_address', align: 'left', label: 'Email Address', field: 'email_address', sortable: true },
    { name: 'date_of_birth', align: 'left', label: 'Date of Birth', field: 'date_of_birth' },
    { name: 'gender', align: 'left', label: 'Gender', field: 'gender' },
//    { name: 'address', align: 'left', label: 'Address', field: row => `${row.address_street}, ${row.address_brgy}, ${row.address_city}, ${row.address_province}` },
//    { name: 'emergency_contact_name', align: 'left', label: 'Emergency contact name', field: row => `${row.ec_last_name}, ${row.ec_first_name}`, sortable: true },
//    { name: 'emergency_contact_number', align: 'left', label: 'Emergency contact number', field: 'ec_phone_number', sortable: true },
//    { name: 'position', align: 'left', label: 'Position', field: 'role', sortable: true },
//    { name: 'hire_date', align: 'left', label: 'Hire date', field: 'hire_date', sortable: true },
//    { name: 'shift_schedule', align: 'left', label: 'Schedule', field: 'shift_schedule', sortable: true },
    { name: 'staff_status', align: 'center', label: 'Status', field: 'staff_status', sortable: true },
  ]);

  const rows = ref<StaffForSelectWrapper>([]);

  const get_staff_lists = debounce(() => {
    rows.value = [];
    staffService.get().then(res => {
      rows.value = res.result;
      isLoading.value = false;
    })
  }, 1500);

  const wrapCsvValue = (val, formatFn, row) => {
    let formatted = formatFn !== void 0
      ? formatFn(val, row)
      : val

    formatted = formatted === void 0 || formatted === null
      ? ''
      : String(formatted)

    formatted = formatted.split('"').join('""')

    return `"${formatted}"`
  }

  const exportTable = () => {
    // naive encoding to csv format
    const content = [columns.value.map(col => wrapCsvValue(col.label))].concat(
      rows.value.map(row => columns.value.map(col => wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[ col.field === void 0 ? col.name : col.field ],
        col.format,
        row
      )).join(','))
    ).join('\r\n')

    const status = exportFile(
      `table-${Date.now()}.csv`,
      content,
      'text/csv'
    )

    if (status !== true) {
      Notify.create({
        message: 'Browser denied file download...',
        position: 'top-right',
        color: 'negative',
        icon: 'warning'
      })
    }

    Notify.create({
      message: 'File exported successfully',
      position: 'top-right',
      color: 'positive',
      icon: 'check'
    })
  }

  const show_staff = (row) => {
    selected.value = row;
    medium.value = true;
  }

  const delete_staff = () => {
    if (!selected.value) {
      return
    }

    staffService.delete(selected.value.staff_id).then(res => {
      confirmDelete.value = false;
      medium.value = false;

      get_staff_lists();
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'positive',
        icon: 'check'
      })
    })
  }

  const update_staff = () => {
    if (!selected.value) {
      return
    }

    staffService.update(selected.value).then(res => {
      isEdit.value = true;
      get_staff_lists();
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'positive',
        icon: 'check'
      })
    })
  }

  onMounted(() => {
    isLoading.value = true;
    get_staff_lists();
  })</script>
