<template>
  <q-page padding>
    <!-- content -->
    <div
      v-if="query_url?.q === 'renew'"
      class="q-mt-xl flex column items-center justify-center q-pa-md"
    >
      <div v-if="is_loading" class="">
        <q-spinner color="secondary" size="10em" :thickness="5" />
      </div>
      <div v-else class="column" style="width: 35%">
        <div class="row q-gutter-x-md items-center">
          <div class="col text-body1">Package Name:</div>
          <div class="col text-weight-bold text-h6 text-capitalize">
            {{ package_one?.package_name }}
          </div>
        </div>
        <div class="row q-gutter-x-md items-center">
          <div class="col text-body1">Duration:</div>
          <div class="col text-weight-bold text-h6 text-capitalize">
            {{ `${package_one?.duration} ${package_one?.package_type}` }}
          </div>
        </div>
        <div class="row q-gutter-x-md items-center">
          <div class="col text-body1">Benefits:</div>
          <div class="col text-weight-bold text-h6 text-capitalize">
            {{ package_one?.benefits }}
          </div>
        </div>
        <div class="row q-gutter-x-md items-center">
          <div class="col text-body1">Price:</div>
          <div class="col text-weight-bold text-h6 text-capitalize">
            {{ package_one?.price }}
          </div>
        </div>
        <div class="row q-mt-sm q-gutter-x-md items-center">
          <div class="col text-body1">
            <q-btn
              label="Proceed to payment"
              color="secondary"
              :loading="is_loading"
              @click="proceed_action"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'quasar';

import PackageService from 'src/services/package.service';
import PaymongoService from 'src/services/paymongo.service';
import MemberService from 'src/services/member.service';
import { PackageForSelect } from 'src/types/package.type';

const packageService = new PackageService();
const paymongoService = new PaymongoService();
const memberService = new MemberService();

const router = useRouter();
const is_loading = ref(false);
const package_one = ref<PackageForSelect>();
const query_url = ref<{
  q: string;
  package_id: string;
  member_id: string;
  email: string;
}>();
const form = ref<{
  member_id: number;
  pack_id: number;
}>({
  member_id: 0,
  pack_id: 0,
});

const get_package = debounce((id: number) => {
  packageService
    .get_by_id(id)
    .then((res) => {
      let temp: PackageForSelect = res.result[0];
      package_one.value = temp;

      is_loading.value = false;
    })
    .catch((error: any) => {
      is_loading.value = false;
      throw error;
    });
}, 1000);

const proceed_action = () => {
  paymongoService
    .create_link({
      package_name: package_one.value?.package_name,
      package_price: Math.round(parseFloat(package_one?.value?.price) * 100),
      package_id: package_one?.value.id,
    })
    .then((res) => {
      console.log(res);
      let temp_url = res.data.attributes.checkout_url;

      form.value.pack_id = parseInt(query_url.value?.package_id);
      form.value.member_id = parseInt(query_url.value?.member_id);

      memberService.renew_package_member(form.value).then((res2) => {
        console.log(res2);
        is_loading.value = false;
        if (res2.result.status !== 201) {
          return;
        }

        window.location.replace(temp_url);
      });
    })
    .catch((error) => {
      is_loading.value = false;
      throw error;
    });
};

onMounted(() => {
  query_url.value = router.currentRoute.value.query;
  is_loading.value = true;

  get_package(parseInt(query_url.value.package_id));
});
</script>
