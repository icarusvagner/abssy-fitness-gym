<template>
  <q-page padding>
    <!-- content -->
    <div class="row">
      <span class="text-h5 text-weight-normal col">Package list</span>
      <div class="col row items-center justify-end q-mb-md">
        <q-btn round color="secondary" icon="mdi-plus" @click="medium = !medium" >
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
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
        <q-input color="secondary" outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template>
    </q-table>

  </q-page>

  <q-dialog
    v-model="medium"
    persistent
  >
    <q-card style="width: 700px; max-width: 80vw;" class="column q-gutter-y-md q-pa-sm">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section class="row items-center q-mb-none">
          <div class="text-h6">Add new Package</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="column q-gutter-y-sm">
          <q-input filled v-model="form.package_name" label="Package name" :rules="[ val => !!val || 'Please enter package name' ]" />
          <q-input filled v-model="form.duration" type="number" label="Duration" min="1" :rules="[ val => val > 1 || 'Please enter duration of package' ]" />
          <q-input filled v-model="form.package_type" label="Package date" bottom-slots :rules="[ val => !!val || 'Please state what type of duration date' ]" >
            <template v-slot:hint>
              e.g(day, week, month, year, etc.)
            </template>
          </q-input>
          <q-input filled v-model="form.price" type="number" label="Price" min="1" :rules="[ val => val > 1 || 'Please enter package price' ]" />
          <q-input filled v-model="form.benefits" autogrow label="Benefits" :rules="[ val => !!val || 'Please state packaged benifits' ]" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn color="secondary" label="Add" type="submit" :loading="isLoading" @click="isLoading = !isLoading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { debounce, Notify } from 'quasar';

  import PackageService from 'src/services/package.service';
  import { PackageForCreate, PackageForUpdate, PackageForSelect, PackageForSelectWrapper } from 'src/types/package.type';

  const packageService = new PackageService();
  const medium = ref(false);
  const filter = ref('');
  const isLoading = ref(false);
  const form = ref<PackageForCreate>({
    package_name: '',
    duration: 0,
    package_type: '',
    price: 0,
    benefits: ''
  })
  const columns = ref([
    { name: 'package_name', align: 'left', label: 'Package name', field: 'package_name', sortable: true },
    { name: 'duration', align: "right", label: 'Duration', field: row => `${row.duration} ${row.package_type}`, sortable: true },
    { name: 'price', align: "right", label: 'Price', field: 'price', sortable: true },
//    { name: 'benefits', align: "right", label: 'Package benefits', field: 'benefits' },
    { name: 'ctime', align: "right", label: 'Date add', field: 'ctime', sortable: true },
  ])

  const rows = ref<PackageForSelectWrapper>([]);

  const onSubmit = debounce(() => {
    packageService.create(form.value).then(res => {
      if (res.result.status === 201) {
        Notify.create({
          message: res.result.message,
          position: 'top-right',
          icon: 'mdi-check',
          color: 'positive',
          timeout: 1300
        })
        onReset();
      }
    })
    isLoading.value = false;
  }, 1000)

  const onReset = () => {
    form.value.package_name = '';
    form.value.package_date = '';
    form.value.duration = 0;
    form.value.price = 0;
    form.value.benefits = '';
  }

  const get_packages = debounce(() => {
    rows.value = [];
    packageService.get().then(res => {
      rows.value = res.result;
      isLoading.value = false;
    })
    isLoading.value = false;
  }, 1100);

  onMounted(() => {
    isLoading.value = true;
    get_packages();
  })
</script>
