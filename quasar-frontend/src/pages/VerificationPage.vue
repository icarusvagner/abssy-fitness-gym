<template>
  <q-page padding class="fit column items-center justify-center">
    <div
      v-if="!isVerified"
      class="fit column items-center justify-center text-center"
    >
      <p class="text-h5">Successfully verified click continue to proceed.</p>
      <q-btn
        color="secondary"
        icon-right="mdi-arrow-right"
        label="Proceed to payment"
        :loading="isLoading"
        @click="clickedIsVerified()"
      />
    </div>
    <div v-else class="">password creation</div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EncodeB64 from 'src/utils/encodeBase64.util';
import PaymongoService from 'src/services/paymongo.service';

defineComponent({
  name: 'VerificationPage',
});

const paymongoService = new PaymongoService();
const router = useRouter();
const isVerified = ref(false);
const isLoading = ref(false);
const decodeUser = ref<string>();
const decodePack = ref<string>();

const clickedIsVerified = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isVerified.value = true;
  }, 1000);
};

// paymongoService.create_link({ package_name: packages.value.package_name, package_price }).then(res => {
//   paymentUrl.value = res.data.attributes.checkout_url;
//   form.value.reference_no = res.data.attributes.reference_number;
//   form.value.purchased_id = res.data.id;

//   memberService.create(form.value).then(res => {
//     if (res.result.status !== 201) {
//       return
//     }
//     alertMsg.value = true;
//     isLoading.value = false;
//   })
// }).catch(error => {
//   isLoading.value = false;
//   throw error;
// });

onMounted(() => {
  decodeUser.value = atob(String(router.currentRoute.value.query.user));
  decodePack.value = atob(String(router.currentRoute.value.query.package));
  console.log(decodeUser.value);
  console.log(decodePack.value);
});
</script>
