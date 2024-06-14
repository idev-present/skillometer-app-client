<template>
  <div class="">
    <div class="bg-white shadow-sm ring-1 lg:mb-5 ring-gray-900/5 rounded-xl">
      <main class="relative mt-2">
        <div class="rounded-lg bg-white shadow">
          <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            <aside class="py-6 lg:col-span-3">
              <nav class="space-y-1">
                <router-link
                    v-for="item in subNavigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[item.href === $route.path ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700' : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center border-l-4 px-3 py-2 text-sm font-medium']"
                    :aria-current="item.href === $route.path ? 'page' : undefined">
                  <component
                      :is="item.icon"
                      :class="[item.href === $route.path ? 'text-blue-500 group-hover:text-blue-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-1 mr-3 h-6 w-6 flex-shrink-0']" aria-hidden="true" />
                  <span class="truncate">{{ item.name }}</span>
                </router-link>
              </nav>
            </aside>

            <div v-if="!isLoading" class="divide-y divide-gray-200 lg:col-span-9">
              <div class="px-4 py-4 sm:p-4 border-b pb-3 flex items-center justify-between">
                <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Информация об отклике
                </h1>
              </div>
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div
                      class="mb-2 flex w-fit items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-blue-700"
                      :class="[replyItem?.status?.bgColor, replyItem?.status?.textColor]"
                  >
                    <svg
                        class="h-1.5 w-1.5 fill-blue-500"
                        :class="[replyItem?.status?.fillColor]"
                        viewBox="0 0 6 6" aria-hidden="true">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                    {{replyItem?.status?.value}}
                  </div>
                <div v-if="replyItem?.vacancy" class="relative flex justify-between gap-x-6 rounded-xl">
                  <div class="min-w-0 flex-1">
                    <h2
                        @click="redirect(`/vacancy/${replyItem.vacancy_id}`)"
                        class="text-xl cursor-pointer font-bold leading-7 text-gray-900 sm:text-2xl sm:tracking-tight"
                    >
                      {{ replyItem?.vacancy?.name }}
                    </h2>
                    <div
                        v-if="replyItem?.vacancy?.salary_to || replyItem?.vacancy?.salary_from"
                        class="mt-1 flex items-center font-bold text-green-600"
                    >
                      <span>{{ formattedNumberValue(replyItem?.vacancy?.salary_from || 0) }}</span>
                      <span v-if="replyItem?.vacancy?.salary_to"
                      >&nbsp;&ndash; {{ formattedNumberValue(replyItem?.vacancy?.salary_to || 0) }}
                        </span>
                      <span>&nbsp;{{ replyItem?.vacancy?.currency?.value || "₽" }}</span>
                    </div>
                    <div
                        class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
                    >
                      <div
                          v-if="replyItem?.vacancy?.employmentType?.name"
                          class="mt-2 flex items-center text-sm text-gray-500"
                      >
                        <BriefcaseIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        {{ replyItem?.vacancy?.employmentType?.name }}
                      </div>
                      <div
                          v-if="replyItem?.vacancy?.city?.name"
                          class="mt-2 flex items-center text-sm text-gray-500"
                      >
                        <MapIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        {{ replyItem?.vacancy?.city?.name }}
                      </div>
                      <div
                          v-if="replyItem?.vacancy?.is_remote"
                          class="mt-2 flex items-center text-sm text-gray-500"
                      >
                        <MapPinIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        Удаленная работа
                      </div>
                    </div>
                    <div
                        class="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-2"
                    >
                      <div v-if="replyItem?.vacancy?.division?.name" class="flex items-center">
                        {{ replyItem?.vacancy?.division?.name }}
                        <svg
                            viewBox="0 0 2 2"
                            class="hidden sm:flex h-0.5 w-0.5 ml-2 fill-current"
                        >
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                      </div>
                      <div v-if="replyItem?.vacancy?.qualification?.name" class="flex items-center">
                        {{ replyItem?.vacancy?.qualification?.name }}
                        <svg
                            viewBox="0 0 2 2"
                            class="hidden sm:flex h-0.5 w-0.5 ml-2 fill-current"
                        >
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                      </div>
                      <div
                          v-for="(skill, index) in replyItem.vacancy.skills"
                          :key="index"
                          class="flex items-center"
                      >
                        <svg
                            v-if="index"
                            viewBox="0 0 2 2"
                            class="hidden sm:flex h-0.5 w-0.5 mr-2 fill-current"
                        >
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                        {{ skill }}
                      </div>
                    </div>
                    <div class="mt-3 flex items-center text-sm text-gray-500">
                      <CalendarIcon
                          class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                      />
                      {{ formattedDateValue(replyItem?.vacancy.published_at) }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <h2
                      class="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:tracking-tight"
                  >
                    Вакансия удалена
                  </h2>
                </div>
              </div>
              <!--Отказ от отклика-->
              <div v-if="(replyItem?.status?.key !== 'DECLINED') || (replyItem?.status?.key !== 'DONE')" class="flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                <button
                    @click="openDeclinedReplyModal"
                    type="button"
                    class="w-full sm:w-fit rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-red-600 outline-0">
                  Отменить отклик
                </button>
              </div>
            </div>

            <loading class="py-40 divide-y divide-gray-200 lg:col-span-9" v-else />
          </div>
        </div>
      </main>
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
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import Loading from "@/shared/Loading.vue";
import {
  BellIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  MapPinIcon,
  MapIcon,
  CalendarIcon,
} from '@heroicons/vue/24/outline'
import {useUserStore} from "@/app/store/modules/user.js";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {useVacancyStore} from "@/app/store/modules/vacancy.js";
import {useRoute, useRouter} from "vue-router";
import {REPLY_STATUS_COLOR} from "@/app/constants/replyStatusColor.js"
import Modal from "@/shared/Modal.vue";

const isLoading = ref(false)

const isDeclinedReplyModal = ref(false)

const router = useRouter()
const route = useRoute()

//* store
const userStore = useUserStore()
const directoriesStore = useDirectoriesStore()
const vacancyStore = useVacancyStore()

const subNavigation = [
  { name: 'Отклики', href: '/reply', icon: EnvelopeIcon },
  { name: 'Уведомления', href: '/notification', icon: BellIcon },
]

const replyItem = computed(() => {
  return {
    ...userStore?.userReplyItem,
    vacancy: vacancyList?.value?.find((e) => e?.id === userStore?.userReplyItem?.vacancy_id) || null,
    status: replyStatusList?.value?.find((e) => e?.key === userStore?.userReplyItem?.status) || null,
  } || null
})

const employmentTypeList = computed(() => {
  return directoriesStore?.employmentTypeList || [];
});
const divisionList = computed(() => {
  return directoriesStore?.divisionList || [];
});
const qualificationList = computed(() => {
  return directoriesStore?.qualificationList || [];
});
const cityList = computed(() => {
  return directoriesStore?.cityList || [];
});
const replyStatusList = computed(() => {
  return directoriesStore?.replyStatusList?.map((item) => ({
    ...item,
    ...REPLY_STATUS_COLOR[item?.key] || null,
  })) || [];
});
const vacancyList = computed(() => {
  return (
      vacancyStore?.vacancyList?.map((item) => ({
        ...item,
        employmentType:
            employmentTypeList?.value?.find(
                (type) => type?.id === item?.employment_type_id
            ) || null,
        skills: item?.skill_set?.split(",") || [],
        division:
            divisionList?.value?.find((type) => type?.id === item?.division_id) ||
            null,
        qualification:
            qualificationList?.value?.find(
                (type) => type?.id === item?.qualification_id
            ) || null,
        city:
            cityList?.value?.find((type) => type?.habr_alias === item?.city_id) ||
            null,
      })) || []
  );
});


const formattedNumberValue = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
const formattedDateValue = (date) => {
  const dateRes = new Date(date);
  const day = String(dateRes.getDate()).padStart(2, "0");
  const month = String(dateRes.getMonth() + 1).padStart(2, "0");
  const year = dateRes.getFullYear();
  return `${day}.${month}.${year}`;
};

const redirect = (url) => {
  if(url) {
    router.push(url)
  }
}

const loadDirectories = async () => {
  if(!directoriesStore?.replyStatusList?.length) {
    await directoriesStore.fillReplyStatusList()
  }
  if(!directoriesStore?.currencyList?.length) {
    await directoriesStore.fillCurrencyList()
  }
  if(!directoriesStore?.cityList?.length) {
    await directoriesStore.fillCityList()
  }
  if(!directoriesStore?.employmentTypeList?.length) {
    await directoriesStore.fillEmploymentTypeList()
  }
  if(!directoriesStore?.divisionList?.length) {
    await directoriesStore.fillDivisionList()
  }
  if(!directoriesStore?.qualificationList?.length) {
    await directoriesStore.fillQualificationList()
  }
}

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

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    loadDirectories()
  ]).finally(async () => {
    if(!vacancyStore?.vacancyList?.length) {
      await vacancyStore.fillVacancyList()
    }
    if(route.params.id) {
      await userStore.fillUserReplyItem(route.params.id)
    }
    isLoading.value = false
  });
})
</script>
