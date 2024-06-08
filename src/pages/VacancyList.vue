<template>
  <div class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-7">
    <div class="lg:col-span-5">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
        Вакансии
      </h1>
      <!--list-->
      <div  class="bg-white shadow-sm ring-1 mt-4 lg:mb-5 ring-gray-900/5 rounded-xl">
        <div class="relative mt-2 p-4">
          <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-6 h-full w-5 text-gray-400" aria-hidden="true" />
          <input name="search"
                 class="block w-full rounded-md border-0 py-1.5 pl-9 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                 placeholder="Поиск"
          />
        </div>
      </div>
      <list-filters class="flex lg:hidden"/>
      <template v-if="!isLoading">
        <router-link
          v-for="(item, index) in vacancyList"
          :key="index"
          class="relative mt-3 flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 bg-white cursor-pointer shadow-sm ring-1 ring-gray-900/5 rounded-xl"
          :to="`/vacancy/${item.id}`"
      >
        <div class="min-w-0 flex-1">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:tracking-tight">
            {{item.name}}
          </h2>
          <div v-if="item?.salary_to || item?.salary_from" class="mt-1 flex items-center font-bold text-green-600">
            <span>{{formattedNumberValue(item?.salary_from || 0)}}</span>
            <span v-if="item?.salary_to">&nbsp;&ndash; {{formattedNumberValue(item?.salary_to || 0) }} </span>
            <span>&nbsp;{{item?.currency?.value || "₽"}}</span>
          </div>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div v-if="item?.employmentType?.name" class="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{item?.employmentType?.name}}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{item?.city?.name}}
            </div>
          </div>
          <div class="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-2">
            <div v-if="item?.division?.name" class="flex items-center">
              {{item?.division?.name}}
              <svg viewBox="0 0 2 2" class="hidden sm:flex h-0.5 w-0.5 ml-2 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
            </div>
            <div v-if="item?.qualification?.name" class="flex items-center">
              {{item?.qualification?.name}}
              <svg viewBox="0 0 2 2" class="hidden sm:flex h-0.5 w-0.5 ml-2 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
            </div>
            <div
                v-for="(skill, index) in item.skills"
                :key="index"
                class="flex items-center"
            >
              <svg v-if="index" viewBox="0 0 2 2" class="hidden sm:flex h-0.5 w-0.5 mr-2 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
              {{skill}}
            </div>
          </div>
          <div class="mt-3 flex items-center text-sm text-gray-500">
            <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {{formattedDateValue(item.published_at)}}
          </div>
        </div>
        <div class="flex shrink-0 -mr-2 sm:mr-0 items-center">
          <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </div>
        </router-link>
      </template>
      <loading class="py-10" v-else />
    </div>
    <list-filters class="hidden lg:flex"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import { ChevronRightIcon, MagnifyingGlassIcon, BriefcaseIcon, MapPinIcon, CalendarIcon } from '@heroicons/vue/20/solid'
import ListFilters from "@/widgets/ListFilters.vue";
import {useVacancyStore} from "@/app/store/modules/vacancy.js";
import Loading from "@/shared/Loading.vue";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";

const isLoading = ref(false)

//* store
const vacancyStore = useVacancyStore()
const directoriesStore = useDirectoriesStore()

const employmentTypeList = computed(() => {
  return directoriesStore?.employmentTypeList || []
})
const divisionList = computed(() => {
  return directoriesStore?.divisionList || []
})
const qualificationList = computed(() => {
  return directoriesStore?.qualificationList || []
})
const cityList = computed(() => {
  return directoriesStore?.cityList || []
})
const vacancyList = computed(() => {
  return vacancyStore?.vacancyList?.map((item) => ({
    ...item,
    employmentType: employmentTypeList?.value?.find((type) => type?.id === item?.employment_type_id) || null,
    skills: item?.skill_set?.split(',') || [],
    division: divisionList?.value?.find((type) => type?.id === item?.division_id) || null,
    qualification: qualificationList?.value?.find((type) => type?.id === item?.qualification_id) || null,
    city: cityList?.value?.find((type) => type?.habr_alias === item?.city_id) || null,
  }))|| []
})
const formattedNumberValue = ((number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});
const formattedDateValue = ((date) => {
  const dateRes = new Date(date);
  const day = String(dateRes.getDate()).padStart(2, '0');
  const month = String(dateRes.getMonth() + 1).padStart(2, '0');
  const year = dateRes.getFullYear();
  return `${day}.${month}.${year}`;
});


onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    directoriesStore.fillCurrencyList(),
    directoriesStore.fillCityList(),
    directoriesStore.fillEmploymentTypeList(),
    directoriesStore.fillDivisionList(),
    directoriesStore.fillQualificationList(),
  ]).then(() => {
    vacancyStore.fillVacancyList()
  });
  isLoading.value = false
})
</script>
