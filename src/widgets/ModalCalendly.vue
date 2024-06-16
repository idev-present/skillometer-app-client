<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300"
                       enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100"
                       leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5
                text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:pb-3">
              <div class="mb-5 sm:mb-6 text-center">
                <XMarkIcon
                    @click="closeModal"
                    class="absolute text-gray-600 hover:text-gray-900 right-2 sm:right-3 top-2 sm:top-3 h-8 w-8 cursor-pointer"
                />
                <DialogTitle as="h3" class="text-lg sm:text-xl font-semibold leading-6 text-gray-900">
                  {{ props.title }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{{ props.description }}</p>
                </div>
              </div>
              <template v-if="!isLoading">
                <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 min-w-52">
                  <div class="md:pr-6">
                    <h2 class="text-base font-semibold leading-6 text-gray-900">
                      Дата
                    </h2>
                    <VueDatePicker
                        class="mt-3"
                        v-model="selectedDate"
                        :inline="true"
                        format="dd.MM.yyyy"
                        locale="ru-RU"
                        :allowed-dates="allowedDates"
                        @update:model-value="deyChange"
                        auto-apply
                    />
                  </div>
                  <section class="w-full mt-5 sm:mt-0 md:pl-6 min-h-[300px]">
                    <h2 class="text-base font-semibold leading-6 text-gray-900">
                      Свободные слоты
                    </h2>
                    <ol class="mt-3 space-y-1 text-sm leading-6 text-gray-500 pr-2 max-h-[300px] overflow-y-auto">
                      <template v-if="selectedDate">
                        <li
                            v-for="(meeting, index) in meetings"
                            :key="index"
                            class="group cursor-pointer border flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
                            :class="selectedTime?.index === index && 'bg-gray-100'"
                            @click="selectedTime = {value: meeting, index: index}"
                        >
                          <div class="flex-auto">
                            <p>
                              <span>{{ dateTimeFormatter(meeting[0]) }}</span> -
                              <span>{{ dateTimeFormatter(meeting[1]) }}</span>
                            </p>
                          </div>
                        </li>
                      </template>
                      <li v-if="!meetings?.length && selectedDate" class="text-gray-600">
                        На выбранный день нет свободных слотов
                      </li>
                      <li v-if="!selectedDate" class="text-gray-600">
                        Выберите дату
                      </li>
                    </ol>
                  </section>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between border-t mt-2 pt-2">
                  <div class="text-gray-600 mb-2 sm:mb-0">
                    {{selectedDate ? formatDate(selectedDate) : ''}}
                    <span v-if="selectedTime">
                      {{selectedTime ? dateTimeFormatterMin(selectedTime.value[0]) : ''}} - {{selectedTime ? dateTimeFormatterMin(selectedTime.value[1]) : ''}}
                    </span>
                  </div>
                  <button
                      @click="submit"
                      type="button"
                      class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white
                    shadow-sm hover:bg-blue-700 outline-0"
                      :class="(!selectedDate && !selectedTime) && 'pointer-events-none bg-gray-500'"
                  >
                    Сохранить
                  </button>
                </div>
              </template>
              <loading class="py-40 divide-y divide-gray-200 lg:col-span-9" v-else />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid/index.js'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Loading from "@/shared/Loading.vue";
import {useUserStore} from "@/app/store/modules/user.js";
import {useRoute} from "vue-router";

const props = defineProps({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  isOpen: {type: Boolean, default: false},
})

//* store
const userStore = useUserStore()

const route = useRoute()

const meetings = ref([])

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const emit = defineEmits(['closeModal', 'submit'])

const selectedDate = ref(null);

const isLoading = ref(false)

const selectedTime = ref(null)

const allowedDates = computed(() => {
  const date = userStore?.availableDays || []
  return date?.map(dateString => new Date(dateString)) || [];
});

const deyChange = async () => {
  selectedTime.value = null
  const payload = {
    id: route?.params?.id || '',
    day: selectedDate?.value?.toISOString().split('T')[0] || ''
  }
  await userStore.getAvailableTime(payload).then((res) => {
    meetings.value = res || []
  })
}

const dateTimeFormatter = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month} ${hours}:${minutes}`;
}

const dateTimeFormatterMin = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

const submit = async () => {
  const payload = {
    id: route?.params?.id || '',
    data: {
      name: `zoom-${route?.params?.id || ''}`,
      type: "ZOOM",
      payload: `payload-${route?.params?.id || ''}`,
      description: `description-${route?.params?.id || ''}`,
      start_at: selectedTime.value.value[0],
      end_at: selectedTime.value.value[1]
    }
  }
  await userStore.createAvailable(payload).finally(() => {
    closeModal()
  })
}
const closeModal = () => {
  emit('closeModal')
}

onMounted(async () => {
  isLoading.value = true
  await userStore.getAvailableDays()
  isLoading.value = false
})
</script>

<style>
.dp__input {
  font-size: 14px !important;
}
.dp--tp-wrap {
  display: none;
}
</style>
