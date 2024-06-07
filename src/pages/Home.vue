<template>
  <div class="mx-auto w-full max-w-7xl mt-[88px] px-4 py-8 md:py-16 sm:px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-7">
      <div class="lg:col-span-5">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Вакансии
        </h1>
        <!--list-->
        <div class="bg-white shadow-sm ring-1 mt-4 ring-gray-900/5 rounded-xl">
          <div class="relative mt-2 p-4">
            <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-6 h-full w-5 text-gray-400" aria-hidden="true" />
            <input name="search"
                   class="block w-full rounded-md border-0 py-1.5 pl-9 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                   placeholder="Поиск"
            />
          </div>
        </div>
        <ul role="list" class="divide-y mt-5 divide-gray-100 overflow-hidden bg-white cursor-pointer shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <li v-for="(item, index) in vacancyList" :key="index" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div class="min-w-0 flex-1">
              <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Back End Developer
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
                <div v-for="(tag, index) in item.tags" :key="index">
                  {{tag}}
                </div>
              </div>
              <div class="mt-3 flex items-center text-sm text-gray-500">
                <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                7 июня
              </div>
            </div>
            <div class="flex shrink-0 -mr-2 sm:mr-0 items-center">
              <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </li>
        </ul>
      </div>
      <!--filters-->
      <div class="hidden lg:flex lg:col-start-6 lg:col-span-2 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl lg:row-end-1 mt-14 p-4">
        <h2 class="text-base font-semibold leading-6 text-gray-900">Filters</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRightIcon, MagnifyingGlassIcon, BriefcaseIcon, MapPinIcon, CalendarIcon } from '@heroicons/vue/20/solid'

const vacancyList = [
  {
    name: 'Тестировщик роботизированных процессов',
    tags: ['Инженер по ручному тестированию', 'JS', 'Python'],
    location: 'Полный рабочий день',
    typeEmployment: 'Можно удалённо'
  },
  {
    name: 'Тестировщик роботизированных процессов',
    tags: ['Инженер по ручному тестированию', 'Python', 'Python'],
    location: 'Полный рабочий день',
    typeEmployment: 'Можно удалённо'
  },
  {
    name: 'Тестировщик роботизированных процессов',
    tags: ['Инженер по ручному тестированию', 'Node JS', 'Python'],
    location: 'Полный рабочий день',
    typeEmployment: 'Можно удалённо'
  },
]
</script>
