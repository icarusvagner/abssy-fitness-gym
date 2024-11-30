<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div
        v-if="is_loading"
        class="flex fit items-center justify-center q-mt-xl"
      >
        <q-spinner color="secondary" size="10em" :thickness="5" />
      </div>
      <div v-else class="membership-card">
        <!-- First row: Logo, Gym name, Availability -->
        <div class="header">
          <div class="logo">
            <img src="logo3.png" alt="Gym Logo" />
          </div>
          <div class="gym-info">
            <h1>ABBSY Fitness GYM</h1>
            <p class="availability">Open 24/7</p>
          </div>
        </div>

        <!-- Second row: Member details and package info -->
        <div class="details">
          <div class="member-info">
            <div class="member-name">
              <h3>Member Name:</h3>
              <h5>
                {{
                  details.first_name +
                  ' ' +
                  details.middle_name.charAt(0) +
                  '. ' +
                  details.last_name
                }}
              </h5>
            </div>
            <p>Membership ID: {{ details.member_id }}</p>
          </div>
          <div class="package-info text-capitalize">
            <h3>Package: {{ details.package_name }}</h3>
            <p>Benefits: {{ details.benefits }}</p>
          </div>
        </div>

        <!-- Footer: Expiration -->

        <div v-if="is_expired_date" class="column justify-center items-center">
          <p class="text-h5 text-weight-bold text-red-5">{{ expiry_date }}</p>
          <q-btn
            color="secondary"
            label="Renew membership"
            :to="{
              name: 'choose_plan',
              query: {
                q: 'renew',
                package_id: details.package_id,
                member_id: details.member_id,
                email: details.email_address,
              },
            }"
          />
        </div>
        <div v-else class="footer">
          <p>
            Expires:
            {{
              date.formatDate(
                expiryDate.getFutureDate(
                  details.registered_at,
                  details.duration,
                  details.package_type
                ),
                'ddd MMMM DD, YYYY hh:ss A'
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { date, debounce } from 'quasar';
import { onBeforeMount, ref } from 'vue';
import MemberService from 'src/services/member.service';
import { OneMemberPackage } from 'src/types/member.type';
import ExpiryDate from 'src/utils/expiryDate.util';

const expiryDate = new ExpiryDate();
const is_expired_date = ref(false);
const is_loading = ref(false);
const expiry_date = ref('');
const memberService = new MemberService();
const details = ref<OneMemberPackage>({
  address: '',
  benefits: '',
  duration: 0,
  first_name: '',
  last_name: '',
  member_id: 0,
  middle_name: '',
  package_id: 0,
  package_name: '',
  package_type: '',
  phone_number: '',
  price: '',
});

const get_my_details = debounce(() => {
  memberService
    .get_one()
    .then((res) => {
      details.value = res.result;

      is_expired_date.value = expiryDate.isExpired(
        details.value.registered_at,
        details.value.duration,
        details.value.package_type
      );
      expiry_date.value = expiryDate.isExpired(
        details.value.registered_at,
        details.value.duration,
        details.value.package_type
      )
        ? 'Membership has expired'
        : '';
      is_loading.value = false;
    })
    .catch((error: any) => {
      is_loading.value = false;
      throw error;
    });
}, 1000);

onBeforeMount(() => {
  is_loading.value = true;
  get_my_details();
});
</script>

<style scoped lang="scss">
@import url('../css/customer_page.scss');
</style>
