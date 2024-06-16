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
                      auto-apply
                  />
                </div>
                <section class="w-full mt-5 sm:mt-0 md:pl-6 min-h-[300px]">
                  <h2 class="text-base font-semibold leading-6 text-gray-900">
                    Свободные слоты
                  </h2>
                  <ol class="mt-3 space-y-1 text-sm leading-6 text-gray-500">
                    <template v-if="selectedDate">
                      <li
                          v-for="meeting in meetings"
                          :key="meeting.id"
                          class="group cursor-pointer border flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100">
                        <div class="flex-auto">
                          <p class="text-gray-900">{{ meeting.name }}</p>
                          <p class="mt-0.5">
                            <time :datetime="meeting.startDatetime">{{ meeting.start }}</time> -
                            <time :datetime="meeting.endDatetime">{{ meeting.end }}</time>
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
                </div>
                <button
                    @click="submit"
                    type="button"
                    class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white
                    shadow-sm hover:bg-blue-700 outline-0"
                    :class="!selectedDate && 'pointer-events-none bg-gray-500'"
                >
                  Сохранить
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {ref, computed} from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid/index.js'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  isOpen: {type: Boolean, default: false},
})

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    start: '1:00 PM',
    startDatetime: '2022-01-21T13:00',
    end: '2:30 PM',
    endDatetime: '2022-01-21T14:30',
  },
  // More meetings...
]

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const emit = defineEmits(['closeModal', 'submit'])

const selectedDate = ref(null);

const allowedDates = computed(() => {
  const date = [
    "2024-06-17",
    "2024-06-18",
    "2024-06-19",
    "2024-06-20",
    "2024-06-21",
    "2024-06-24",
    "2024-06-25",
    "2024-06-26",
    "2024-06-27",
    "2024-06-28"
  ]
  return date?.map(dateString => new Date(dateString)) || [];
});

const submit = () => {
  emit('submit')
}
const closeModal = () => {
  emit('closeModal')
}
</script>

<style>
.dp__input {
  font-size: 14px !important;
}
.dp--tp-wrap {
  display: none;
}
</style>
