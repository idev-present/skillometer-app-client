<template>
  <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
    <div class="bg-white border px-4 pb-4 pt-3 shadow rounded-lg">
      <h2 id="timeline-title" class="text-xl font-bold">
        История
      </h2>

      <!-- Activity Feed -->
      <div class="mt-6 flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(item, itemIdx) in timeline" :key="item.id">
            <div class="relative pb-8">
                    <span v-if="itemIdx !== timeline.length - 1"
                          class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div class="relative flex space-x-3">
                <div>
                        <span
                          :class="[item.type.bgColorClass, 'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white']">
                          <component :is="item.type.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                </div>
                <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500">
                      {{ item.content }} <a href="#" class="font-medium text-gray-900">{{ item.target }}</a>
                    </p>
                  </div>
                  <div class="whitespace-nowrap text-right text-sm text-gray-500">
                    <time :datetime="item.datetime">{{ item.date }}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-6 flex flex-col justify-stretch">
        <div v-if="(replyItem?.status?.key !== 'DECLINED') && (replyItem?.status?.key !== 'DONE')">
          <button
              @click="openDeclinedReplyModal"
              type="button"
              class="w-full rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-red-600 outline-0">
            Отменить отклик
          </button>
        </div>
      </div>
    </div>
    <modal
        :is-open="isDeclinedReplyModal"
        title="Вы действительно ходите отменить отклик?"
        description="При отмене, работодатель не будет рассматривать ваше резюме"
        @close-modal="closeModal"
        @submit="declinedReply"
        button-name="Да"
        button-name-close="Нет"
        is-textarea
        textarea-label="Укажите причину отказа"
    />
  </section>
</template>

<script setup>
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid/index.js'
import {computed, ref} from "vue";
import {useUserStore} from "@/app/store/modules/user.js";
import {REPLY_STATUS_COLOR} from "@/app/constants/replyStatusColor.js";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import Modal from "@/shared/Modal.vue";
import {useRoute} from "vue-router";

const userStore = useUserStore()
const directoriesStore = useDirectoriesStore()

const route = useRoute()

const isDeclinedReplyModal = ref(false)

const replyItem = computed(() => {
  return {
    ...userStore?.userReplyItem,
    status: replyStatusList?.value?.find((e) => e?.key === userStore?.userReplyItem?.status) || null,
  } || null
})

const replyStatusList = computed(() => {
  return directoriesStore?.replyStatusList?.map((item) => ({
    ...item,
    ...REPLY_STATUS_COLOR[item?.key] || null,
  })) || [];
});

const openDeclinedReplyModal = () => {
  isDeclinedReplyModal.value = true
}

const closeModal = () => {
  isDeclinedReplyModal.value = false
}

const declinedReply = async (reason) => {
  const payload = {
    id: replyItem.value.id,
    data: {
      status: 'DECLINED',
      reason: reason || 'Причина не указана'
    }
  }
  if(payload?.id) {
    await userStore.changeStatusToDeclined(payload)
    await userStore.fillUserReplyItem(route.params.id)
    closeModal()
  } else {
    console.error('Не найден ID отклика')
  }
}

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' }
}

const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20'
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22'
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28'
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30'
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04'
  }
]
</script>
