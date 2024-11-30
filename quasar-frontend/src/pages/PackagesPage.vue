<template>
  <q-page padding>
    <!-- content -->
    <div class="row">
      <span class="text-h5 text-weight-normal col">Package list</span>
      <div class="col row items-center justify-end q-mb-md">
        <q-btn round color="secondary" icon="mdi-plus" @click="showAddPack">
          <q-tooltip
            anchor="bottom middle"
            self="top middle"
            :offset="[10, 10]"
          >
            add package
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-table
      ref="tableRef"
      bordered
      title="Packages"
      :rows="rows"
      :columns="columns"
      row-key="item_name"
      :filter="filter"
      :loading="isLoading"
      card-class="bg-grey-12 text-grey-10"
      table-class="text-capitalize"
    >
      <template v-slot:top-right>
        <q-input
          color="secondary"
          outlined
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

      <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="onRowClick(props.row)"
          v-if="props.row.status != 'removed'"
        >
          <q-td key="package_name" :props="props">
            {{ props.row.package_name }}
          </q-td>
          <q-td key="duration" :props="props">
            {{ `${props.row.duration} ${props.row.package_type}` }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="ctime" :props="props">
            {{ date.formatDate(props.row.ctime, 'MMMM DD, YYYY') }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="q-mt-xl flex column q-gutter-y-md">
      <div class="row">
        <span class="text-h5 text-weight-normal col">Package removed List</span>
      </div>
      <q-table
        ref="tableRef"
        bordered
        title="Packages"
        :rows="rows"
        :columns="columns"
        row-key="item_name"
        :filter="filter"
        :loading="isLoading"
        card-class="bg-grey-12 text-grey-10"
        table-class="text-capitalize"
      >
        <template v-slot:top-right>
          <q-input
            color="secondary"
            outlined
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

        <template v-slot:loading>
          <q-inner-loading showing color="secondary" />
        </template>

        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="onRowClick(props.row)"
            v-if="props.row.status == 'removed'"
            class="cursor-pointer bg-red-5 text-white"
          >
            <q-td key="package_name" :props="props">
              {{ props.row.package_name }}
            </q-td>
            <q-td key="duration" :props="props">
              {{ `${props.row.duration} ${props.row.package_type}` }}
            </q-td>
            <q-td key="price" :props="props">
              {{ props.row.price }}
            </q-td>
            <q-td key="ctime" :props="props">
              {{ date.formatDate(props.row.ctime, 'MMMM DD, YYYY') }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>

  <q-dialog v-model="medium" persistent>
    <q-card
      style="width: 700px; max-width: 80vw"
      class="column q-gutter-y-md q-pa-sm"
    >
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="row items-center q-mb-none">
          <div class="text-h6">Add new Package</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="column q-gutter-y-sm">
          <q-input
            filled
            v-model="form.package_name"
            label="Package name"
            :rules="[(val) => !!val || 'Please enter package name']"
          />
          <q-input
            filled
            v-model="form.package_type"
            label="Package date"
            bottom-slots
            :rules="[
              (val) => !!val || 'Please state what type of duration date',
            ]"
          >
            <template v-slot:hint> e.g(day, week, month, year, etc.) </template>
          </q-input>
          <q-input
            filled
            v-model="form.duration"
            type="number"
            label="Duration"
            :min="form.package_type != 'day' ? 1 : 7"
            :rules="[(val) => val > 0 || 'Please enter duration of package']"
          />
          <q-input
            filled
            v-model="form.price"
            type="number"
            label="Price"
            min="100"
            :rules="[(val) => val > 0 || 'Please enter package price']"
          />
          <q-select
            label="Benefits"
            filled
            v-model="benefits"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            class="col"
            :rules="[(val) => !!val || 'Enter benefits']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="primary"
            v-close-popup
            @click="close_modal"
          />
          <q-btn
            color="secondary"
            label="Add"
            type="submit"
            :loading="isLoading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

  <q-dialog v-model="medium2" persistent>
    <q-card style="width: 700px; max-width: 80vw" class="q-pa-sm">
      <q-form @submit="onUpdateSubmit">
        <q-card-section class="row items-center q-mb-none">
          <div class="text-h6">Package details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            filled
            v-model="formUpdate.package_name"
            label="Package name"
            :rules="[(val) => !!val || 'Please enter package name']"
          />
          <div class="row">
            <q-select
              filled
              v-model="formUpdate.package_type"
              :options="options"
              label="Package date type"
              class="col"
            />
            <q-input
              filled
              v-model.number="formUpdate.duration"
              type="number"
              label="Duration"
              :min="formUpdate.package_type != 'day' || 'days' ? 1 : 7"
              :rules="[(val) => val > 0 || 'Please enter package duration']"
              class="col q-mr-md"
            />
          </div>
          <q-input
            filled
            v-model.number="formUpdate.price"
            label="Price"
            type="number"
            :rules="[(val) => val > 1 || 'Please enter package price']"
          />
          <q-select
            label="Benefits"
            filled
            v-model="benefits"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            class="col"
            :rules="[(val) => !!val || 'Enter benefits']"
          />
          <q-select
            filled
            v-model="formUpdate.pack_status"
            :options="options2"
            label="Package avaibility"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-if="formUpdate.pack_status != 'removed'"
            flat
            label="remove"
            color="red-5"
            @click="remove_package(formUpdate.id)"
          />
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn
            :disabled="isUpdate"
            color="secondary"
            label="Save changes"
            type="submit"
            :loading="isLoading"
            @click="isLoading = !isLoading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { debounce, date, Notify } from 'quasar';

import PackageService from 'src/services/package.service';
import {
  PackageForCreate,
  PackageForUpdate,
  PackageForSelectWrapper,
  PackageType,
} from 'src/types/package.type';

const benefits = ref(null);
const options = ref([
  'day',
  'days',
  'week',
  'weeks',
  'month',
  'months',
  'year',
  'years',
]);
const options2 = ref(['active', 'inactive', 'removed']);
const isUpdate = ref(false);
const packageService = new PackageService();
const medium = ref(false);
const medium2 = ref(false);
const filter = ref('');
const isLoading = ref(false);
const formUpdate = ref<PackageForUpdate>({
  id: 0,
  package_name: '',
  duration: 0,
  package_type: '',
  price: 0,
  benefits: '',
  status: '',
});
const form = ref<PackageForCreate>({
  package_name: '',
  duration: 0,
  package_type: '',
  price: 0,
  benefits: '',
});
const columns = ref([
  {
    name: 'package_name',
    align: 'left',
    label: 'Package name',
    field: 'package_name',
    sortable: true,
  },
  {
    name: 'duration',
    align: 'right',
    label: 'Duration',
    field: (row) => `${row.duration} ${row.package_type}`,
    sortable: true,
  },
  {
    name: 'price',
    align: 'right',
    label: 'Price',
    field: 'price',
    sortable: true,
  },
  //    { name: 'benefits', align: "right", label: 'Package benefits', field: 'benefits' },
  {
    name: 'ctime',
    align: 'right',
    label: 'Date add',
    field: 'ctime',
    sortable: true,
  },
]);

const rows = ref<PackageForSelectWrapper>([]);

const showAddPack = () => {
  medium.value = true;
  benefits.value = null;
};

const onSubmit = debounce(() => {
  if (benefits.value.length < 0) {
    return false;
  }
  form.value.benefits = benefits.value.join(', ');
  packageService.create(form.value).then((res) => {
    if (res.result.status === 201) {
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        icon: 'mdi-check',
        color: 'positive',
        timeout: 1300,
      });
      onReset();
      get_packages();
      isLoading.value = false;
    }
  });
  isLoading.value = false;
}, 1000);

const onReset = () => {
  form.value.package_name = '';
  form.value.package_type = '';
  form.value.duration = 0;
  form.value.price = 0;
  form.value.benefits = '';
  medium.value = false;
};

const get_packages = debounce(() => {
  rows.value = [];
  benefits.value = null;
  packageService.get().then((res) => {
    rows.value = res.result;
    isLoading.value = false;
  });
  isLoading.value = false;
}, 500);

const onRowClick = (row) => {
  formUpdate.value.id = row.id;
  formUpdate.value.package_name = row.package_name;
  formUpdate.value.duration = row.duration;
  formUpdate.value.package_type = row.package_type;
  formUpdate.value.price = row.price;
  formUpdate.value.pack_status = row.status;
  benefits.value = row.benefits.split(',');
  isUpdate.value = false;
  medium2.value = true;
};

const onUpdateSubmit = debounce(() => {
  if (benefits.value.length < 0) {
    return false;
  }

  formUpdate.value.benefits = benefits.value.join(', ');
  packageService.update(formUpdate.value).then((res) => {
    if (res.result.status === 201) {
      Notify.create({
        message: res.result.message,
        position: 'top-right',
        icon: 'mdi-check',
        color: 'positive',
        timeout: 1300,
      });
      get_packages();
      medium2.value = false;
    }
  });
  isLoading.value = false;
  isUpdate.value = true;
}, 1000);

const close_modal = () => {
  onReset();
  isLoading.value = false;
};

const remove_package = debounce((id: number) => {
  isLoading.value = true;
  packageService.delete(id).then((res) => {
    console.log(res);
    Notify.create({
      message: res.result.message,
      position: 'top-right',
      icon: 'mdi-check',
      color: 'warning',
      timeout: 1300,
    });
    get_packages();
    medium2.value = false;
    isLoading.value = false;
  });
}, 1000);

onBeforeMount(() => {
  isLoading.value = true;
  get_packages();
});
</script>
