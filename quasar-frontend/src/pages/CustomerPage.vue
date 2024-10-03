<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div class="membership-card">
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
        <div class="footer">
          <p>
            Expires:
            {{
              date.formatDate(
                expiryDate.getFutureDate(
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
import { date } from 'quasar';
import { onMounted, ref } from 'vue';
import MemberService from 'src/services/member.service';
import { OneMemberPackage } from 'src/types/member.type';
import ExpiryDate from 'src/utils/expiryDate.util';

const expiryDate = new ExpiryDate();
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

const get_my_details = () => {
  memberService
    .get_one()
    .then((res) => {
      details.value = res.result;
      console.log(details.value);
    })
    .catch((error) => {
      throw error;
    });
};

onMounted(() => {
  get_my_details();
});
</script>

<style scoped lang="scss">
.membership-card {
  background-color: #ffffff;
  width: 45%;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;

  /* Header section */
  .header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr; /* Logo takes up 2 spans, rest 1 span each */
    align-items: start; /* Align items at the start */
    gap: 10px; /* Optional spacing between columns */
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 15px;

    .logo {
      grid-column: span 1; /* Logo spans 2 columns */
      img {
        width: 45%; /* Ensure image takes full space of its column */
        height: auto;
        border-radius: 24px;
      }
    }

    .gym-info {
      grid-column: span 2;
      h1 {
        margin: 0;
        font-size: 22px;
      }
    }

    .availability {
      font-size: 14px;
      color: #32cd32;
    }
  }

  /* Member details */
  .details {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 2px solid #eee;
    margin-bottom: 15px;
  }

  .member-info {
    flex-wrap: 1;
    text-align: start;
    h3,
    h6 {
      margin: 0;
      font-size: 18px;
    }
  }

  .package-info {
    flex-wrap: 1;
    text-align: start;

    h3 {
      margin: 0;
      font-size: 16px;
    }

    p {
      text-wrap: wrap;
      font-size: 16px;
      color: #666;
    }
  }

  /* Footer */
  .footer {
    font-size: 14px;
    font-weight: bold;
    color: #ff0000;
  }
}
</style>
