<template>
    <q-table
      bordered
      title="Trainers"
      :rows="rows"
      :columns="columns"
      row-key="fullname"
      :filter="filter"
      card-class="bg-grey-12 text-grey-10"
      table-class="text-capitalize"
      :loading="isLoading"
    >
      <template v-slot:top-right> <q-btn
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

      <template v-slot:body-cell-trainer_status="props">
        <q-td key="first_name" :props="props">
          <q-badge rounded :color="props.row.trainer_status === 'active' ? 'positive' : 'warning'" >
            <q-tooltip anchor="bottom middle" self="top middle">
              {{ props.row.trainer_status }}
            </q-tooltip>
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td key="action" :props="props">
          <q-btn flat rounded dense color="secondary" icon="mdi-information-outline" @click="show_trainer(props.row)" />
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
          <q-btn flat dense rounded color="red-5" icon="mdi-trash-can-outline" @click="confirmDelete = !confirmDelete" v-if="selected.trainer_status === 'active'">
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
              <q-input filled dense v-model="selected.specialization" :readonly="isEdit" label="Specialization" class="col" />
              <q-input filled dense v-model="selected.hire_date" :readonly="isEdit" label="Hire date" class="col" />
            </div>
          </div>
          <q-input filled dense bottom-slots v-model="selected.certifications" :readonly="isEdit" label="Certifications" class="col" >
            <template v-slot:hint>
              Comma separated (new york, ADSF, etc)
            </template>
          </q-input>
          <q-input filled dense bottom-slots v-model="selected.availability" :readonly="isEdit" label="Availability Schedule" class="col" >
            <template v-slot:hint>
              Comma separated (monday, tuesday, etc)
            </template>
          </q-input>

        </q-card-section>

        <q-card-actions v-if="isEdit" align="right" class="bg-white text-teal">
          <q-btn v-if="selected.trainer_status === 'active'" color="secondary" label="edit" @click="isEdit = !isEdit" />
          <q-btn flat label="CLOSE" color="dark" v-close-popup />
        </q-card-actions>

        <q-card-actions v-else align="right" class="bg-white text-teal">
          <q-btn color="secondary" label="Save changes" @click="update_trainer" />
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
          <q-btn flat label="Confirm" color="positive" @click="delete_trainer" />
          <q-btn label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { debounce, exportFile, Notify } from 'quasar';

  import { TrainerForSelectWrapper, TrainerForSelect } from 'src/type/trainer.type';
  import TrainerService from 'src/services/trainer.service';

  const trainerService = new TrainerService();
  const medium = ref(false);
  const selected = ref<TrainerForSelect>();
  const isLoading = ref(false);
  const filter = ref('');
  const isEdit = ref(true);
  const confirmDelete = ref(false);

  const columns = ref([
    { name: 'action', align: 'center', label: 'Action'  },
    { name: 'fullname', required: true, label: 'Fullname', align: 'left', field: row => `${row.first_name} ${row.middle_name.charAt(0).toUpperCase()}. ${row.last_name}`, format: val => `${val}`, sortable: true },
    { name: 'phone_number', align: 'left', label: 'Mobile/Phone Number', field: 'phone_number', sortable: true },
    { name: 'email_address', align: 'left', label: 'Email Address', field: 'email_address', sortable: true },
    { name: 'date_of_birth', align: 'left', label: 'Date of Birth', field: 'date_of_birth' },
    { name: 'gender', align: 'left', label: 'Gender', field: 'gender' },
    { name: 'trainer_status', align: 'center', label: 'Status', field: 'trainer_status', sortable: true },
  ]);

  const rows = ref<TrainerForSelectWrapper>([]);

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

  const get_trainers_list = debounce(() => {
    rows.value = [];
    trainerService.get().then(res => {
      rows.value = res.result;
      isLoading.value = false;
    })
  }, 1500);

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
      `trainer-${Date.now()}.csv`,
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

  const show_trainer = (row) => {
    selected.value = row;
    medium.value = true;
  }

  const delete_trainer = () => {
    if (!selected.value) {
      return
    }

    trainerService.delete(selected.value.trainer_id).then(res => {
      confirmDelete.value = false;
      medium.value = false;

      get_trainers_list();
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'positive',
        icon: 'check'
      })
    })
  }

  const update_trainer = () => {
    if (!selected.value) {
      return
    }

    trainerService.update(selected.value).then(res => {
      isEdit.value = true;
      get_trainers_list();
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
    get_trainers_list();
  })
</script>
