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
        <Listbox as="div" v-model="selectedQualification">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Квалификация
          </ListboxLabel>
          <div class="relative mt-0.5">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
              <span class="block truncate">{{ selectedQualification.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="(item, index) in qualificationList" :key="index" :value="item" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.name }}</span>
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
      <!--  skills  -->
      <div class="w-full mt-4">
        <Listbox as="div" v-model="selectedDivision">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Профессиональные навыки
          </ListboxLabel>
          <div class="relative mt-0.5">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
              <span class="block truncate">{{ selectedDivision.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="(item, index) in divisionList" :key="index" :value="item" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.name }}</span>
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
                <ListboxOption as="template" v-for="(type, index) in employmentTypeList" :key="index" :value="type" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
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
        <label class="block text-sm font-medium leading-6 text-gray-900">
          Зарплата
        </label>
        <div class="flex items-center">
          <input name="price"
                 class="block mr-2 w-full rounded-md border-0 py-[5px] mt-0.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                 @input="inputPrice"
                 v-model="inputValue"
                 placeholder="От"
          />
          <Listbox as="div" v-model="selectedCurrency">
            <div class="relative mt-0.5 w-[64px]">
              <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 sm:text-sm sm:leading-6">
                <span class="block truncate">{{ selectedCurrency.value }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>
              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <ListboxOption as="template" v-for="(item, index) in currencyList" :key="index" :value="item" v-slot="{ active, selected }">
                    <li :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.value }}</span>
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
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {ChevronRightIcon} from "@heroicons/vue/20/solid/index.js";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";

const directoriesStore = useDirectoriesStore()

const selectedCurrency = ref({key: "RUR", value: "₽"})
const currencyList = computed(() => {
  return directoriesStore?.currencyList || []
})
const selectedQualification = ref({key: "all", name: "Любая"})
const qualificationList = computed(() => {
  return [
      {key: "all", name: "Любая"},
      ...directoriesStore?.qualificationList
  ]
})
const selectedEmploymentType = ref({key: "all", name: "Любая"})
const employmentTypeList = computed(() => {
  return [
    {key: "all", name: "Любая"},
    ...directoriesStore?.employmentTypeList
  ]
})
const selectedDivision = ref({key: "all", name: "Любая"})
const divisionList = computed(() => {
  return [
    {key: "all", name: "Любая"},
    ...directoriesStore?.divisionList
  ]
})
const inputValue = ref('')


const inputPrice = (value) => {
  const regex = /^(\d+(\.\d{0,2})?)?$/;
  const newValue = event.target.value;

  if (regex.test(newValue)) {
    inputValue.value = newValue;
  } else {
    event.target.value = inputValue.value;
  }
}

const isShowFilters = ref(true)

const onShowFilters = () => {
  isShowFilters.value = !isShowFilters.value
}

onMounted(() => {
  if(window.innerWidth < 1024) {
    isShowFilters.value = false
  }
})
</script>
