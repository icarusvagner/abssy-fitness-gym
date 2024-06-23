<template>
  <q-page class="q-pb-xl">
    <!-- content -->
    <div class="row wrap justify-center">
      <div  v-for="(item, index) in announcements" :key="index" class="col-12 col-md-5">
        <q-card v-if="item.announcement_type === 'event' && isLessThanAWeek(item.created_at)" dark bordered class="bg-grey-11 q-ma-md text-dark shadow-12" style="border-radius: 15px;">
          <q-card-section>
            <div class="text-h6 text-capitalize">{{ item.title }}</div>
            <div class="text-subtitle2">posted on: {{ item.created_at }}</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            {{ item.message }}
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-inner-loading
      :showing="isLoading"
      label="Loading events..."
      label-class="secondary"
      label-style="font-size: 1.1em"
    />
  </q-page>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  import AnnouncementService from 'src/services/announcement.service';
  import { AnnouncementForSelect, AnnouncementForSelectWrapper } from 'src/types/announcement.type';
  import { isLessThanAWeek } from 'src/utils/checker.util';

  const announcementService = new AnnouncementService();
  const isLoading = ref(false);
  const announcements = ref<AnnouncementForSelectWrapper>([]);

  const get_announcements = () => {
    announcements.value = [] ;
    announcementService.get().then(res => {
      announcements.value = res.result;
      isLoading.value = false;
      console.log(announcements.value);
    })
  }

  onMounted(() => {
    isLoading.value = true;
    get_announcements();
  })
</script>
