<template>
  <div class="flex flex-col lg:col-start-6 lg:col-span-2 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl lg:row-end-1 mt-3 lg:mt-14 lg:p-4">
    <div @click="onShowFilters"
         class="flex flex-row justify-between items-center cursor-pointer lg:cursor-auto lg:m-0 p-4 lg:p-0 lg:pointer-events-none"
    >
      <h2 class="text-base font-semibold leading-6 text-gray-900">Фильтры</h2>
      <ChevronRightIcon
          v-if="!isShowFilters"
          class="flex lg:hidden h-5 w-5 flex-none text-gray-400 rotate-90"
          aria-hidden="true" />
      <ChevronRightIcon
          v-else
          class="flex lg:hidden h-5 w-5 flex-none text-gray-400 -rotate-90"
          aria-hidden="true" />
    </div>
    <div v-if="isShowFilters" class="p-4 pt-0 lg:p-0">
      <!--    qualification-->
      <div class="w-full lg:mt-4">
        <Listbox as="div" v-model="selected">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Квалификация
          </ListboxLabel>
          <div class="relative mt-0.5">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
              <span class="block truncate">{{ selected.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="item in qualification" :key="item.id" :value="item" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.name }}</span>
                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <!--  skills  -->
      <div class="w-full mt-4">
        <Listbox as="div" v-model="selectedSkills">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Профессиональные навыки
          </ListboxLabel>
          <div class="relative mt-0.5">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
              <span class="block truncate">{{ selectedSkills.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="skill in skills" :key="skill.id" :value="skill" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ skill.name }}</span>
                    <span v-if="selected" :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <!--  Employment type  -->
      <div class="w-full mt-4">
        <Listbox as="div" v-model="selectedEmploymentType">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Тип занятости
          </ListboxLabel>
          <div class="relative mt-0.5">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 sm:text-sm sm:leading-6">
              <span class="block truncate">{{ selectedEmploymentType.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="type in employmentType" :key="type.id" :value="type" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ type.name }}</span>
                    <span v-if="selected" :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <!--  Price  -->
      <div class="w-full mt-4">
        <Listbox as="div" v-model="selectedPrice">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Зарплата
          </ListboxLabel>
          <div class="relative mt-0.5">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 sm:text-sm sm:leading-6">
              <span class="block truncate">{{ selectedPrice.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="price in prices" :key="price.id" :value="price" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ price.name }}</span>
                    <span v-if="selected" :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {ChevronRightIcon} from "@heroicons/vue/20/solid/index.js";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";

const directoriesStore = useDirectoriesStore()

const currencyList = ref([
  { key: 'all', value: 'Любая' },
])

const qualification = [
  { id: 1, name: 'Любая' },
  { id: 2, name: 'Стажер (Intern)' },
  { id: 3, name: 'Младший (Junior)' },
  { id: 4, name: 'Средний (Middle)' },
  { id: 5, name: 'Старший (Senior)' },
  { id: 6, name: 'Ведущий (Lead)' },
];
const skills = [
  { id: 1, name: 'Любая' },
  { id: 2, name: 'Адаптивная верстка' },
  { id: 3, name: 'Git' },
  { id: 4, name: 'Nuxt.js' },
  { id: 5, name: 'Google Firebase' },
  { id: 6, name: 'TypeScript' },
  { id: 7, name: 'Vue.js' },
  { id: 8, name: 'React.js' },
  { id: 9, name: 'JavaScript' },
  { id: 10, name: 'SCSS' },
  { id: 11, name: 'БЭМ' },
];
const employmentType = [
  { id: 1, name: 'Любой' },
  { id: 2, name: 'Полный рабочий день' },
  { id: 3, name: 'Неполный рабочий день' },
];
const prices = [
  { id: 1, name: 'Любая' },
  { id: 2, name: 'RUB' },
  { id: 3, name: 'USD' },
  { id: 3, name: 'EUR' },
];

const selected = ref(qualification[0])
const selectedSkills = ref(skills[0])
const selectedEmploymentType = ref(employmentType[0])
const selectedPrice = ref(prices[0])

const isShowFilters = ref(true)

const onShowFilters = () => {
  isShowFilters.value = !isShowFilters.value
}

onMounted(async () => {
  // currencyList.value =
})
</script>
