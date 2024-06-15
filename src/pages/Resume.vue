<template>
  <div class="">
    <div class="bg-white shadow-sm ring-1 lg:mb-5 ring-gray-900/5 rounded-xl">
      <main class="relative mt-2">
        <div class="overflow-hidden rounded-lg bg-white shadow">
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
              <div class="px-4 py-4 sm:p-4 pb-3">
                <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Резюме
                </h1>
              </div>
              <!-- Личная информация -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                  <router-link to="/profile" class="cursor-pointer">
                    Личная информация
                  </router-link>
                  <router-link
                      class="cursor-pointer flex items-center font-bold text-sm text-blue-600 hover:text-blue-700"
                      to="/profile"
                  >
                    <PencilIcon
                        class="mr-1 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                    />
                    Редактировать
                  </router-link>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-12">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Имя Фамилия</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.title || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Пол</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.isGender ? resume?.gender : '-'}}
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Возраст</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.age || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Город</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.city?.name || '-'}}
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-12">
                    <div class="text-sm font-medium leading-6 text-gray-900">Описание</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.bio || '-'}}
                    </div>
                  </div>
                </div>
              </div>
              <!-- Специализация -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                  <router-link to="/specialization" class="cursor-pointer">
                    Специализация
                  </router-link>
                  <router-link
                      class="cursor-pointer flex items-center font-bold text-sm text-blue-600 hover:text-blue-700"
                      to="/specialization"
                  >
                    <PencilIcon
                        class="mr-1 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                    />
                    Редактировать
                  </router-link>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Готовность к работе</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.selectedSearchStatus?.name || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Квалификация</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.selectedQualification?.name || '-'}}
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Специализация</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.selectedDivision?.name || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Зарплата</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      от {{resume?.salary_from || '-'}}
                      <div class="ml-1" v-if="resume?.selectedCurrency?.value">
                        {{resume.selectedCurrency.value}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-12">
                    <div class="text-sm font-medium leading-6 text-gray-900">Профессиональные навыки</div>
                    <div v-if="resume?.skills?.length" class="flex items-center">
                      <div v-for="(skill, index) in resume.skills"
                           :key="index"
                           class="mt-0.5 flex items-center text-sm leading-6 text-gray-700"
                      >
                        <svg
                            v-if="index"
                            viewBox="0 0 2 2"
                            class="hidden sm:flex h-0.5 w-0.5 mx-2 fill-current"
                        >
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                        {{ skill }}
                      </div>
                    </div>
                    <div v-else class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      -
                    </div>
                  </div>
                </div>
                <div v-if="resume?.is_relocation || resume?.is_remote"
                     class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6"
                >
                  <div
                      v-if="resume?.is_relocation"
                      class="col-span-6"
                  >
                    <div class="mt-0.5 flex items-center font-medium text-sm leading-6 text-gray-900">
                      Готов к переезду
                    </div>
                  </div>
                  <div v-if="resume?.is_remote" class="col-span-6">
                    <div class="mt-0.5 flex items-center font-medium text-sm leading-6 text-gray-900">
                      Готов к удаленной работе
                    </div>
                  </div>
                </div>
              </div>
              <!-- Опыт работы -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                  <router-link to="/specialization" class="cursor-pointer">
                    Опыт работы
                  </router-link>
                  <router-link
                      class="cursor-pointer flex items-center font-bold text-sm text-blue-600 hover:text-blue-700"
                      to="/experience"
                  >
                    <PencilIcon
                        class="mr-1 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                    />
                    Редактировать
                  </router-link>
                </div>
                <div class="divide-y divide-gray-300 lg:col-span-9">
                  <div
                      v-for="(item, index) in resume?.xp"
                      :key="index"
                  >
                    <div class="py-4" :class="(index + 1 === resume?.xp?.length) && 'pb-0'">
                      <div class="grid grid-cols-12">
                        <div class="col-span-12 text-lg font-bold leading-6 text-gray-900">
                          {{item?.company_name || '-'}}
                        </div>
                        <div class="col-span-12 mt-0.5 text-sm leading-6 text-gray-700">{{item?.position || '-'}}</div>
                      </div>
                      <div class="pt-4 grid grid-cols-12 gap-6">
                        <div class="col-span-12">
                          <div class="text-sm font-medium leading-6 text-gray-900">Ваши обязанности и достижения</div>
                          <div class="mt-0.5 text-sm leading-6 text-gray-700">{{item?.description || '-'}}</div>
                        </div>
                      </div>
                      <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Начало работы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                                aria-hidden="true"
                            />
                            {{item?.start_date ? formatDate(item.start_date) : '-'}}
                          </div>
                        </div>
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Окончание работы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                                aria-hidden="true"
                            />
                            {{item?.end_date ? formatDate(item?.end_date) : 'По настоящее время'}}
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 grid grid-cols-12 gap-6">
                        <div class="col-span-12">
                          <div class="text-sm font-medium leading-6 text-gray-900">Применяемые вами навыки</div>
                          <div class="mt-0.5 text-sm leading-6 text-gray-700 flex items-center">
                            <div
                                v-for="(skill, indexSkills) in item?.skills"
                                :key="indexSkills"
                                class="flex items-center"
                            >
                              <svg
                                  v-if="indexSkills"
                                  viewBox="0 0 2 2"
                                  class="hidden sm:flex h-0.5 w-0.5 mx-2 fill-current"
                              >
                                <circle cx="1" cy="1" r="1" />
                              </svg>
                              {{skill}}
                            </div>
                            <div v-if="!item?.skills?.length">
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!resume?.xp?.length"
                       class="w-full flex flex-col items-center py-28"
                  >
                    <span class="text-lg mb-3">Опыт работы отсутствует или не указан</span>
                    <router-link
                        class="w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0"
                        to="/experience/new"
                    >
                      Добавить опыт работы
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- Образование -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                  <router-link to="/education" class="cursor-pointer">
                    Образование
                  </router-link>
                  <router-link
                      class="cursor-pointer flex items-center font-bold text-sm text-blue-600 hover:text-blue-700"
                      to="/education"
                  >
                    <PencilIcon
                        class="mr-1 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                    />
                    Редактировать
                  </router-link>
                </div>
                <div class="divide-y divide-gray-300 lg:col-span-9">
                  <div
                      v-for="(item, index) in resume?.education"
                      :key="index"
                  >
                    <div class="py-4" :class="(index + 1 === resume?.education?.length) && 'pb-0'">
                      <div class="grid grid-cols-12">
                        <div class="col-span-12 text-lg font-bold leading-6 text-gray-900">
                          {{item?.university_name || '-'}}
                        </div>
                        <div class="col-span-12 mt-0.5 text-sm leading-6 text-gray-700">{{item?.faculty_name || '-'}}</div>
                      </div>
                      <div class="pt-4 grid grid-cols-12 gap-4 sm:gap-6">
                        <div class="col-span-12 sm:col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Местоположение учебного заведения</div>
                          <div class="mt-0.5 text-sm leading-6 text-gray-700">{{item?.city?.name || '-'}}</div>
                        </div>
                        <div class="col-span-12 sm:col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Специализация</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            {{item?.specialization || ''}}
                          </div>
                        </div>
                      </div>
                      <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Начало учебы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                                aria-hidden="true"
                            />
                            {{item?.start_date ? formatDate(item.start_date) : '-'}}
                          </div>
                        </div>
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Завершение учебы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                                aria-hidden="true"
                            />
                            {{item?.end_date ? formatDate(item?.end_date) : 'По настоящее время'}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!resume?.education?.length"
                       class="w-full flex flex-col items-center py-28"
                  >
                    <span class="text-lg mb-3">Образование отсутствует или не указано</span>
                    <router-link
                        class="w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0"
                        to="/education/new"
                    >
                      Добавить образование
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- Контакты -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                  <router-link to="/contacts" class="cursor-pointer">
                    Контакты
                  </router-link>
                  <router-link
                      class="cursor-pointer flex items-center font-bold text-sm text-blue-600 hover:text-blue-700"
                      to="/contacts"
                  >
                    <PencilIcon
                        class="mr-1 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                    />
                    Редактировать
                  </router-link>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Электронная почта</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.email || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Телефон</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.phone ? maskPhone(resume.phone) : '-'}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <loading class="py-40 divide-y divide-gray-200 lg:col-span-9" v-else />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useApplicantStore} from "@/app/store/modules/applican.js";
import Loading from "@/shared/Loading.vue";
import {
  CogIcon,
  PencilIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {BriefcaseIcon, CalendarIcon} from "@heroicons/vue/20/solid/index.js";
import {AcademicCapIcon, UserPlusIcon, WrenchScrewdriverIcon} from "@heroicons/vue/24/outline/index.js";

const isLoading = ref(false)

//* store
const applicantStore = useApplicantStore()
const directoriesStore = useDirectoriesStore()

const subNavigation = [
  { name: 'Профиль', href: '/profile', icon: UserCircleIcon },
  { name: 'Специализация', href: '/specialization', icon: CogIcon },
  { name: 'Опыт работы', href: '/experience', icon: BriefcaseIcon },
  { name: 'Образование', href: '/education', icon: AcademicCapIcon },
  { name: 'Контакты', href: '/contacts', icon: UserPlusIcon },
  { name: 'Резюме', href: '/resume', icon: WrenchScrewdriverIcon },
]

const searchStatusList = computed(() => {
  return directoriesStore?.searchStatusList || []
})
const qualificationList = computed(() => {
  return directoriesStore?.qualificationList || []
})
const divisionList = computed(() => {
  return directoriesStore?.divisionList || []
})
const currencyList = computed(() => {
  return directoriesStore?.currencyList || []
})
const cityList = computed(() => {
  return directoriesStore?.cityList || []
})

const resume = computed(() => {
  return {
    ...applicantStore.resume,
    selectedSearchStatus: searchStatusList?.value?.find((e) => e.id === applicantStore?.resume?.search_status_id) || null,
    selectedQualification: qualificationList?.value?.find((e) => e.id === applicantStore?.resume?.qualification_id) || null,
    selectedDivision: divisionList?.value?.find((e) => e.id === applicantStore?.resume?.division_id) || null,
    selectedCurrency: currencyList?.value?.find((e) => e.key === applicantStore?.resume?.currency) || null,
    skills: applicantStore?.resume?.skill_set?.split(',') || [],
    xp: applicantStore?.resume?.xp?.map((item) => ({
      ...item,
      skills: item?.skill_set?.split(',') || [],
    })) || [],
    education: applicantStore?.resume?.education?.map((item) => ({
      ...item,
      city: cityList?.value?.find((e) => e.id === (item?.city_id || '')) || null,
    })) || [],
    city: cityList?.value?.find((item) => item.id === (applicantStore?.resume?.city_id || '')) || null,
    isGender: applicantStore?.resume?.gender || false,
    gender: applicantStore?.resume?.gender === 'male' ? 'Мужской' : 'Женский',
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const maskPhone = (phone) => {
  if (phone.length !== 10) {
    return ''
  }
  const areaCode = phone.slice(0, 3);
  const centralOfficeCode = phone.slice(3, 6);
  const lineNumberPart1 = phone.slice(6, 8);
  const lineNumberPart2 = phone.slice(8);
  return `+7 (${areaCode}) ${centralOfficeCode}-${lineNumberPart1}-${lineNumberPart2}`
}

const loadDirectories = async () => {
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
  if(!directoriesStore?.searchStatusList?.length) {
    await directoriesStore.fillSearchStatusList()
  }
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    loadDirectories()
  ]).finally(async() => {
    await applicantStore.fillResume()
    isLoading.value = false
  });
})
</script>
