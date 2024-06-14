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
                  <h1 class="px-4 py-4 sm:p-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 border-b pb-3">
                    Образование
                  </h1>
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8">
                  <!--Заголовок с описанием-->
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">
                      {{route?.params?.id === 'new' ? 'Добавление образование' : 'Редактирование образование'}}
                    </h2>
                  </div>
                  <div>
                    <!--Название универа/факультет-->
                    <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900">
                          Название заведения
                        </label>
                        <input
                            type="text"
                            v-model="education.university_name"
                            class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        <span v-if="errors?.university_name" class="text-red-600 text-sm">
                          {{errors.university_name}}
                        </span>
                      </div>
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900">
                          Факультет
                        </label>
                        <input
                            type="text"
                            v-model="education.faculty_name"
                            class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        <span v-if="errors?.faculty_name" class="text-red-600 text-sm">
                          {{errors.faculty_name}}
                        </span>
                      </div>
                    </div>
                    <!--город универа/специализация-->
                    <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
                      <div class="col-span-12 sm:col-span-6">
                        <Listbox as="div" v-model="education.city">
                          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                            Местоположение учебного заведения
                          </ListboxLabel>
                          <div class="relative mt-0.5">
                            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                              <span class="block truncate">{{ education?.city?.name || '&nbsp;' }}</span>
                              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                            </ListboxButton>
                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                              <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption as="template" v-for="(item, index) in cityList" :key="index" :value="item" v-slot="{ active, selected }">
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
                        <span v-if="errors?.city_id" class="text-red-600 text-sm">
                          {{errors.city_id}}
                        </span>
                      </div>
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900">
                          Специализация
                        </label>
                        <input
                            type="text"
                            v-model="education.specialization"
                            class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        <span v-if="errors?.specialization" class="text-red-600 text-sm">
                          {{errors.specialization}}
                        </span>
                      </div>
                    </div>
                    <!--Дата начала/конца-->
                    <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block mb-1 text-sm font-medium leading-6 text-gray-900">
                          Начало учебы
                        </label>

                        <VueDatePicker
                            v-model="education.startDate"
                            format="dd.MM.yyyy"
                            auto-apply
                            locale="ru-RU"
                        />
                        <span v-if="errors?.start_date" class="text-red-600 text-sm">
                          {{errors.start_date}}
                        </span>
                      </div>
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block mb-1 text-sm font-medium leading-6 text-gray-900">
                          Завершение учебы
                        </label>
                        <VueDatePicker
                            v-model="education.endDate"
                            format="dd.MM.yyyy"
                            auto-apply
                            locale="ru-RU"
                        />
                        <p class="mt-0.5 mb-1 text-sm text-gray-500">
                          Если обучаетесь по настоящее время, дату завершения учебы указывать не нужно
                        </p>
                        <span v-if="errors?.end_date" class="text-red-600 text-sm">
                          {{errors.end_date}}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--сохранить-->
                <div class="flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                  <button @click="saveForm" type="button" class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
                    {{route?.params?.id === 'new' ? 'Добавить' : 'Изменить'}}
                  </button>
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
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,
} from '@headlessui/vue'
import {
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  UserCircleIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {BriefcaseIcon, CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid";
import {useRoute, useRouter} from "vue-router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import EducationForm from "@/app/forms/EducationForm.js";

const isLoading = ref(false)

const router = useRouter()
const route = useRoute()

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
const education = ref({
  university_name: '',
  faculty_name: '',
  city: null,
  startDate: null,
  endDate: null,
  specialization: '',
});

const errors = ref({
  university_name: '',
  faculty_name: '',
  city_id: '',
  start_date: '',
  end_date: null,
  specialization: '',
})

const cityList = computed(() => {
  return directoriesStore?.cityList || []
})

const saveForm = async () => {
  const payload = {
    data: {
      university_name: education?.value?.university_name || '',
      faculty_name: education?.value?.faculty_name || '',
      city_id: education?.value?.city?.id || '',
      start_date: education?.value?.startDate || '',
      end_date: education?.value?.endDate || null,
      specialization: education?.value?.specialization || '',
    }
  }
  errors.value = EducationForm.validate(payload.data)
  if(!errors.value && !isLoading.value) {
    isLoading.value = true
    if(route.params.id === 'new') {
      await applicantStore.createEducation(payload).then(() => {
        applicantStore.getEducationList()
        router.push('/education')
      }).finally(() => {
        isLoading.value = false
      })
    } else {
      payload.id = route.params.id
      await applicantStore.updateEducation(payload).then(() => {
        applicantStore.getEducationList()
        router.push('/education')
      }).finally(() => {
        isLoading.value = false
      })
    }
  }
}

const loadDirectories = async () => {
  if(!directoriesStore?.cityList?.length) {
    await directoriesStore.fillCityList()
  }
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    loadDirectories()
  ]).finally(async () => {
    if(route.params.id !== 'new') {
      if(!applicantStore?.educationList?.length) {
        await applicantStore.getEducationList()
      }
      const educationItem = applicantStore.educationList?.find((item) => item.id === route.params.id)
      if(educationItem) {
        education.value = {
          university_name: educationItem?.university_name || '',
          faculty_name: educationItem?.faculty_name || '',
          startDate: educationItem?.start_date || '',
          endDate: educationItem?.end_date || '',
          specialization: educationItem?.specialization || '',
          city: cityList?.value?.find((item) => item.id === (educationItem?.city_id || '')) || null,
        }
      } else {
        await router.push('/education')
      }
    }
    isLoading.value = false
  });
})
</script>

<style scoped>
.dp__input {
  font-size: 14px !important;
}
</style>
