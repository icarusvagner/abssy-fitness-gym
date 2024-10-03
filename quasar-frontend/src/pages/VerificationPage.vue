<template>
  <q-page padding class="fit column items-center justify-center">
    <div v-if="isExpired">
      <span class="text-h4">Link is expired </span>
      <span></span>
    </div>
    <div v-else class="fit column items-center justify-center">
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
      <div v-else class="fit column items-center justify-center">
        <q-form
          @submit.prevent="submitChangePass"
          class="q-gutter-md"
          style="width: 55%"
        >
          <q-input
            filled
            v-model="form.username"
            label="Username"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your username',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="form.password"
            label="Password"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please enter your password',
            ]"
          />

          <q-btn
            label="Create"
            :loading="isLoading"
            type="submit"
            color="secondary"
          />
        </q-form>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="alertMsg" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >After proceeding please copy the reference above for proof.</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Proceed" color="secondary" @click="proceedUrl()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PaymongoService from 'src/services/paymongo.service';
import { debounce } from 'quasar';
import MemberService from 'src/services/member.service';

defineComponent({
  name: 'VerificationPage',
});

const paymongoService = new PaymongoService();
const memberService = new MemberService();
const router = useRouter();
const isVerified = ref(false);
const isLoading = ref(false);
const decodeUser = ref<string[]>([]);
const decodePack = ref<string[]>([]);
const paymentUrl = ref(null);
const isExpired = ref(false);
const alertMsg = ref(false);

const form = ref<{
  email: string;
  username: string;
  password: string;
  reference_no: string;
  purchased_id: number;
  package_id: number;
}>({
  email: '',
  username: '',
  password: '',
  reference_no: '',
  purchased_id: 0,
  package_id: 0,
});

const clickedIsVerified = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isVerified.value = true;
  }, 1000);
};

const proceedUrl = () => {
  window.location.replace(paymentUrl.value);
};

const submitChangePass = debounce(async () => {
  isLoading.value = true;
  paymongoService
    .create_link({
      package_name: decodePack.value[0],
      package_price: Math.round(parseFloat(decodePack.value[1]) * 100),
      package_id: decodePack.value[2],
    })
    .then((res) => {
      paymentUrl.value = res.data.attributes.checkout_url;
      form.value.reference_no = res.data.attributes.reference_number;
      form.value.email = decodeUser.value[0];
      form.value.purchased_id = res.data.id;
      form.value.package_id = parseInt(decodePack.value[2]);

      memberService.verify_change(form.value).then((res) => {
        isLoading.value = false;
        if (res.result.status !== 201) {
          return;
        }
        alertMsg.value = true;
      });
    })
    .catch((error) => {
      isLoading.value = false;
      throw error;
    });
}, 1000);

const check_verified = (email: string) => {
  memberService.check_verified_email(email).then((res) => {
    if (res.result.email_verified_at != null) {
      router.push({ name: 'login' });
    }
  });
};

onMounted(() => {
  String(router.currentRoute.value.query.user)
    .split('.')
    .forEach((item) => decodeUser.value.push(atob(item)));
  String(router.currentRoute.value.query.package)
    .split('.')
    .forEach((item) => decodePack.value.push(atob(item)));

  // check_verified(decodeUser.value[0]);
});
</script>
