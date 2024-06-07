<template>
  <div class="mx-auto w-full max-w-7xl mt-[88px] px-4 py-8 md:py-16 sm:px-6 lg:px-8">
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <router-link to="/vacancy" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Back
        </router-link>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div class="flex">
              <router-link to="/vacancy" class="text-sm font-medium text-gray-500 hover:text-gray-700">Vacancies</router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{vacancyItem.name}}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="min-w-0 flex-1">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
            {{vacancyItem.name}}
          </h2>
          <div class="mt-1 flex items-center font-bold text-sm text-green-600">
            250 000 &ndash; 800 000 ₽
          </div>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Полный рабочий день
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Удаленная
            </div>
          </div>
          <div class="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div v-for="(tag, index) in vacancyItem.tags" :key="index">
              {{tag}}
            </div>
          </div>
          <div class="mt-3 flex items-center text-sm text-gray-500">
            <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            7 июня
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRightIcon, BriefcaseIcon, MapPinIcon, CalendarIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'

const vacancyItem = ref({
  name: 'Тестировщик роботизированных процессов',
  tags: ['Инженер по ручному тестированию', 'Node JS', 'Python'],
  location: 'Полный рабочий день',
  typeEmployment: 'Можно удалённо'
})
</script>
