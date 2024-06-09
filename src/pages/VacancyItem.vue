<template>
  <div class="">

    <!-- navigation -->
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <router-link to="/vacancy" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Назад
        </router-link>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-2">
          <li>
            <div class="flex">
              <router-link to="/vacancy" class="text-sm font-medium text-gray-500 hover:text-gray-700">Вакансии</router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span class="ml-2 text-sm font-medium text-gray-700">{{vacancyItem.name}}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>

    <!-- cards -->
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            {{vacancyItem.name}}
          </h2>
          <div v-if="vacancyItem?.salary_to || vacancyItem?.salary_from" class="mt-1 flex items-center font-bold text-green-600">
            <span>{{formattedNumberValue(vacancyItem?.salary_from || 0)}}</span>
            <span v-if="vacancyItem?.salary_to">&nbsp;&ndash; {{formattedNumberValue(vacancyItem?.salary_to || 0) }} </span>
            <span>&nbsp;{{vacancyItem?.currency?.value || "₽"}}</span>
          </div>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div v-if="vacancyItem?.employmentType?.name" class="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{vacancyItem?.employmentType?.name}}
            </div>
            <div v-if="vacancyItem?.city?.name" class="mt-2 flex items-center text-sm text-gray-500">
              <MapIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{vacancyItem?.city?.name}}
            </div>
            <div v-if="vacancyItem?.is_remote" class="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Удаленная работа
            </div>
          </div>
          <div class="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-2">
            <div v-if="vacancyItem?.division?.name" class="flex items-center">
              {{vacancyItem?.division?.name}}
              <svg viewBox="0 0 2 2" class="hidden sm:flex h-0.5 w-0.5 ml-2 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
            </div>
            <div v-if="vacancyItem?.qualification?.name" class="flex items-center">
              {{vacancyItem?.qualification?.name}}
              <svg viewBox="0 0 2 2" class="hidden sm:flex h-0.5 w-0.5 ml-2 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
            </div>
            <div
                v-for="(skill, index) in vacancyItem.skills"
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
            {{formattedDateValue(vacancyItem.published_at)}}
          </div>
        </div>
      </div>
    </div>

    <!-- description cards -->
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="vacancy_description min-w-0 flex-1">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight border-b-2 pb-3">
            Описание вакансии
          </h2>
          <div class="mt-4 " v-html="vacancyItem?.description"/>
          <div>
            <div class="mt-4 text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-xl">О компании</div>
            <div v-html="vacancyItem?.team"/>
          </div>
          <div>
            <div class="mt-4 text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-xl">Ожидания от кандидата</div>
            <div v-html="vacancyItem?.todo"/>
          </div>
        </div>
      </div>
    </div>
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">

        <!-- Response -->
        <div class="min-w-0 flex-1">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight border-b-2 pb-3">
            Ваш отклик
          </h2>
          <div class="mt-4 flex flex-col text-gray-900">
            <p class="text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-xl">Сопроводительное письмо</p>
            <div>
              <p class="mt-2">Работодатель прежде всего смотрит на ваш профиль, но вы также можете сопроводить свой отклик парой слов, чтобы привлечь внимание к своим самым важным профессиональным или личным качествам.</p>
            </div>
              <div class="mt-3">
                <textarea rows="4" name="comment" id="comment" class="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6" />
              </div>
            <button type="button" class="mt-3 w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
              Откликнуться
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { ChevronRightIcon, BriefcaseIcon, MapIcon, MapPinIcon, CalendarIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'
import {useVacancyStore} from "@/app/store/modules/vacancy.js";
import Loading from "@/shared/Loading.vue";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import { useRoute } from 'vue-router'

const router = useRoute()

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

const vacancyItem = computed(() => {
  return {
    ...vacancyStore?.vacancyItem,
    employmentType: employmentTypeList?.value?.find((type) => type?.id === vacancyStore?.vacancyItem?.employment_type_id) || null,
    skills: vacancyStore?.vacancyItem?.skill_set?.split(',') || [],
    division: divisionList?.value?.find((type) => type?.id === vacancyStore?.vacancyItem?.division_id) || null,
    qualification: qualificationList?.value?.find((type) => type?.id === vacancyStore?.vacancyItem?.qualification_id) || null,
    city: cityList?.value?.find((type) => type?.habr_alias === vacancyStore?.vacancyItem?.city_id) || null,
  }
});
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

onMounted(async() => {
  isLoading.value = true
  await Promise.all([
    directoriesStore.fillCityList(),
    directoriesStore.fillEmploymentTypeList(),
    directoriesStore.fillDivisionList(),
    directoriesStore.fillQualificationList(),
  ]).then(() => {
    vacancyStore.fillVacancyItem(router.params.id)
  }).finally(() => {
    isLoading.value = false
  });
})
</script>

<style scoped>
.vacancy_description {}
</style>