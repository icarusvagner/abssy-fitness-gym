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

        <div v-if="is_expired_date" class="column justify-center items-center">
          <p class="text-h5 text-weight-bold text-red-5">{{ expiry_date }}</p>
          <q-btn color="secondary" label="Renew membership" />
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

const get_my_details = () => {
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
    })
    .catch((error) => {
      throw error;
    });
};

onBeforeMount(() => {
  get_my_details();
});
</script>

<style scoped lang="scss">
.membership-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  margin: auto;
  text-align: left;

  .header,
  .details,
  .footer {
    width: 100%;
    padding: 8px 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    margin-bottom: 12px;

    .logo img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }

    .gym-info {
      flex-grow: 1;
      margin-left: 12px;

      h1 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }

      .availability {
        font-size: 13px;
        color: #32cd32;
        margin-top: 4px;
      }
    }
  }

  .details {
    display: flex;
    flex-direction: column; /* Stack items in a column */
    gap: 12px; /* Space between items */
    border-bottom: 1px solid #eee;
    margin-bottom: 12px;
    padding-bottom: 12px;

    .member-info,
    .package-info {
      display: flex;
      flex-direction: column; /* Stack content vertically */
      align-items: flex-start;

      h3 {
        margin: 0 0 4px;
        font-size: 18px;
        color: #333;
      }

      h5 {
        margin: 0;
        font-size: 16px;
        color: #555;
      }

      p {
        font-size: 14px;
        color: #555;
        margin: 4px 0;
      }
    }
  }

  .footer {
    font-size: 15px;
    font-weight: bold;
    color: #ff4500;
    text-align: center;
    padding-top: 8px;
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .membership-card {
    width: 100%;
    padding: 12px;
  }

  .header .gym-info h1 {
    font-size: 18px;
  }

  .details h3,
  .details h5 {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .membership-card {
    padding: 8px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;

    .gym-info {
      margin-left: 0;
      margin-top: 8px;
    }
  }

  .footer {
    font-size: 14px;
  }
}
</style>
