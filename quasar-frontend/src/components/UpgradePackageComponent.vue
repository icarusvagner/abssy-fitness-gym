<template>
  <span class="q-my-xl text-h4 text-weight-bold">Upgrade your package</span>
  <div
    class="fit row wrap justify-start items-start content-start q-gutter-x-md"
  >
    <q-card
      v-for="item in packages"
      bordered
      class="my-card shadow-5"
      :key="item.id"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h4 text-capitalize">{{ item.package_name }}</div>
            <div class="text-h6">
              {{ item.price }} for {{ item.duration }} {{ item.package_type }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <p class="text-h6 text-weight-bold">Benefits</p>
        <p
          v-for="benefit in item.benefits.split(',')"
          :key="benefit"
          class="text-subtitle1 q-ml-md"
        >
          <q-icon name="mdi-check-decagram-outline" color="positive" />
          {{ benefit }}
        </p>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          flat
          color="secondary"
          @click="
            proceed_selection(item.package_name, parseInt(item.price), item.id)
          "
          >Select Package</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'quasar';
import { PackageForSelectWrapper } from 'src/types/package.type';
import { api } from 'boot/axios';

import PaymongoService from 'src/services/paymongo.service';
import MemberService from 'src/services/member.service';

defineComponent({
  name: 'UpgradePackageComponent',
});

const paymongoService = new PaymongoService();
const memberService = new MemberService();
const router = useRouter();

const lorem = ref(
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo id, blanditiis suscipit vero dolores ipsam libero fugit! Deleniti, beatae sunt illum dignissimos nesciunt quis nostrum veritatis dolorum, placeat facilis explicabo.'
);
const packages = ref<PackageForSelectWrapper>([]);
const is_loading = ref(false);

const formUpgrade = ref<{
  member_id: number;
  ref_number: string;
  purchased_id: number;
  pack_id: number;
}>({
  member_id: 0,
  ref_number: '',
  purchased_id: 0,
  pack_id: 0,
});

const get_packages = debounce(async () => {
  packages.value = [];
  try {
    const response = await api.get('/package/get/0');
    packages.value = response.data.result;
    is_loading.value = false;
  } catch (error: any) {
    throw error.message;
  }
}, 1000);

const proceed_selection = debounce(
  (pack_name: string, pack_price: number, pack_id: number) => {
    is_loading.value = true;

    paymongoService
      .create_link({
        package_name: pack_name,
        package_price: Math.round(parseFloat(pack_price) * 100),
        package_id: pack_id,
      })
      .then((res) => {
        console.log(res);
        let temp_url = res.data.attributes.checkout_url;

        formUpgrade.value.ref_number = res.data.attributes.reference_number;
        formUpgrade.value.member_id = parseInt(
          router.currentRoute.value.query.member_id
        );
        formUpgrade.value.purchased_id = res.data.id;
        formUpgrade.value.pack_id = pack_id;

        memberService.upgrade_package_member(formUpgrade.value).then((res2) => {
          is_loading.value = false;
          console.log(res2);
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
  },
  1000
);

onBeforeMount(() => {
  is_loading.value = true;
  get_packages();
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
