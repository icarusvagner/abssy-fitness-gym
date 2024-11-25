<template>
  <q-page padding>
    <!-- content -->
    <div class="row items-center justify-between">
      <div class="text-h6 text-weight-light">Announcements</div>
      <q-btn
        round
        color="secondary"
        icon="mdi-plus"
        @click="new_announce = true"
      >
        <q-tooltip anchor="bottom middle" self="top left" :offset="[15, 10]">
          new announcement
        </q-tooltip>
      </q-btn>
    </div>
    <div class="q-mt-md">
      <q-expansion-item
        v-for="(item, index) in announcements"
        :key="index"
        :icon="
          isLessThanThreeDays(item.created_at)
            ? 'mdi-bullhorn-variant'
            : 'mdi-bullhorn-variant-outline'
        "
        :label="item.title"
        :caption="item.created_at"
        :header-class="item.stats == 'removed' ? 'bg-red-5 text-white' : ''"
      >
        <q-card class="bg-grey-3">
          <q-card-section>
            {{ item.message }}
          </q-card-section>

          <q-card-actions v-if="item.stats != 'removed'" align="left">
            <q-btn
              flat
              size="md"
              color="red-5"
              @click="remove_announcement(item.announcement_id)"
              >Remove</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </div>

    <q-inner-loading
      :showing="isLoading"
      label="Loading announcements..."
      label-class="secondary"
      label-style="font-size: 1.1em"
    />
  </q-page>

  <q-dialog v-model="new_announce" persistent>
    <q-card>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">New Announcements</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            @click="clear_inputs"
            v-close-popup
          />
        </q-card-section>

        <q-card-section style="width: 450px" class="column q-gutter-y-md">
          <q-input
            v-model="form.title"
            filled
            :rules="[(val) => !!val || 'Enter title for the announcement']"
            label="Title"
          />
          <q-input
            v-model="form.message"
            filled
            :rules="[(val) => !!val || 'Enter message for the announcement']"
            label="Message"
            type="textarea"
          />
          <q-select
            filled
            v-model="form.announcement_type"
            :options="options"
            label="Announcement type"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            outlined
            v-close-popup
            @click="clear_inputs"
          />
          <q-btn
            type="submit"
            flat
            label="Add"
            color="secondary"
            :disabled="isSubmit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { debounce, Notify } from 'quasar';

import AnnouncementService from 'src/services/announcement.service';
import {
  AnnouncementForCreate,
  AnnouncementForUpdate,
  AnnouncementForSelect,
  AnnouncementForSelectWrapper,
} from 'src/types/announcement.type';
import useAuthStore from 'stores/auth-store';
import { isLessThanThreeDays } from 'src/utils/checker.util';

const authStore = useAuthStore();
const options = ref(['announcement', 'event']);
const new_announce = ref(false);
const announcementService = new AnnouncementService();
const isSubmit = ref(false);
const isLoading = ref(false);
const form = ref<AnnouncementForCreate>({
  user_id: authStore.getId,
  title: '',
  message: '',
  announcement_type: '',
});
const announcements = ref<AnnouncementForSelectWrapper>([]);

const get_announcements = debounce(() => {
  announcements.value = [];
  announcementService.get(1).then((res) => {
    announcements.value = res.result;
    isLoading.value = false;
  });
}, 1500);

const remove_announcement = debounce((remove_id: number) => {
  isLoading.value = true;
  announcementService.delete(remove_id).then((res) => {
    get_announcements();
    isLoading.value = false;
  });
}, 1500);

const onSubmit = () => {
  announcementService.create(form.value).then((res) => {
    if (res.result.status === 201) {
      clear_inputs();
      isSubmit.value = true;
      get_announcements();

      Notify.create({
        message: res.result.message,
        position: 'top-right',
        color: 'green-4',
        textColor: 'white',
        icon: 'mdi-cloud-check-outline',
      });

      new_announce.value = false;
    } else {
      Notify.create({
        position: 'top-right',
        color: 'red-5',
        textColor: 'white',
        icon: 'mdi-alert',
        message: res.error.message,
      });
    }
  });
};

const clear_inputs = debounce(() => {
  form.value.title = '';
  form.value.message = '';
}, 500);

const onReset = () => {
  form.value.title = '';
  form.value.message = '';
};

onMounted(() => {
  isLoading.value = true;
  get_announcements();
});
</script>
