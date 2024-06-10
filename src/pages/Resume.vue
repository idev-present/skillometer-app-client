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
              <!-- personal information -->
              <h1 class="px-4 py-4 sm:p-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Резюме
              </h1>
              <div class="hidden sm:block">
                <nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                  <router-link v-for="(tab, tabIdx) in tabs" :key="tab.name" :to="tab.href" :class="[tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10']" :aria-current="tab.current ? 'page' : undefined">
                    <span>{{ tab.name }}</span>
                    <span aria-hidden="true" :class="[tab.current ? 'bg-blue-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
                  </router-link>
                </nav>
              </div>

              <!-- Личная информация-->
              <experience-resume
                  :city-list="cityList"
              />
              <!-- Специализация-->
              <specialization-resume
                  :employment-type-list="employmentTypeList"
                  :qualificationList="qualificationList"
                  :skill-list="skillList"
              />

              <!-- Опыт работы -->
              <div v-if="false" class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8 ">
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Опыт работы</h2>
                    <p class="mt-1 text-sm text-gray-500">
                      Укажите ваш опыт работы
                    </p>
                  </div>
                  <!--Название компании/Местоположение компании-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <label
                          class="block text-sm font-medium leading-6 text-gray-900">
                        Название компании
                      </label>
                      <input
                          type="text"
                          v-model="user.email"
                          class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                      <label class="block text-sm font-medium leading-6 text-gray-900">
                        Местоположение компании
                      </label>
                      <input type="text"
                             v-model="user.telegram"
                             class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <!--Специализация/квалификация-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <Listbox as="div" v-model="user.selectedDivision">
                        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                          Специализация
                        </ListboxLabel>
                        <div class="relative mt-0.5">
                          <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                            <span class="block truncate">{{ user?.selectedDivision?.name || '&nbsp;' }}</span>
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

                    <div class="col-span-12 sm:col-span-6">
                      <Listbox as="div" v-model="user.selectedQualification">
                        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                          Квалификация
                        </ListboxLabel>
                        <div class="relative mt-0.5">
                          <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                            <span class="block truncate">{{ user?.selectedQualification?.name || '&nbsp;' }}</span>
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
                  </div>
                  <!--навыки-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <label class="block text-sm font-medium leading-6 text-gray-900">
                        Профессиональные навыки
                      </label>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Выберите до десяти своих профессиональных навыков, вначале укажите самые важные. Точный стек навыков поможет нам подбирать для вас подходящие вакансии и курсы.
                      </p>
                      <multiselect
                          class="mt-1"
                          v-model="skill"
                          placeholder="Найдите или добавьте тег"
                          :show-labels="false"
                          label="name"
                          track-by="id"
                          :options="skillList"
                          :multiple="true"
                          :taggable="true"
                          @tag="addTagSkill"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Контакты -->
              <div v-if="false" class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8 ">
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Контакты</h2>
                    <p class="mt-1 text-sm text-gray-500">
                      Укажите, как с вами могут связаться работодатели.
                    </p>
                  </div>
                  <!--почта/тг-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900">
                        Электронная почта
                      </label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          autocomplete="email"
                          v-model="user.email"
                          class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                      <label for="telegram" class="block text-sm font-medium leading-6 text-gray-900">
                        Telegram
                      </label>
                      <input type="text"
                             name="telegram"
                             id="telegram"
                             autocomplete="telegram"
                             v-model="user.telegram"
                             class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <!--телефон/сайт-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <label
                          for="phone"
                          class="block text-sm font-medium leading-6 text-gray-900">
                        Телефон
                      </label>
                      <input
                          type="tel"
                          name="phone"
                          id="phone"
                          autocomplete="phone"
                          v-model="user.phone"
                          class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                      <label for="web" class="block text-sm font-medium leading-6 text-gray-900">
                        Личный сайт или профиль в соцсетях
                      </label>
                      <input type="text"
                             name="web"
                             id="web"
                             autocomplete="web"
                             v-model="user.web"
                             class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
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
  Listbox,
  ListboxButton, ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import {
  BellIcon,
  CogIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid/index.js";
import Multiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.css"
import ExperienceResume from "@/widgets/resume/ExperienceResume.vue";
import SpecializationResume from "@/widgets/resume/SpecializationResume.vue";

const isLoading = ref(false)

//* store
const applicantStore = useApplicantStore()
const directoriesStore = useDirectoriesStore()

const subNavigation = [
  { name: 'Профиль', href: '/profile', icon: UserCircleIcon },
  { name: 'Резюме', href: '/resume', icon: CogIcon },
  { name: 'Уведомления', href: '/notification', icon: BellIcon },
]
const tabs = [
  { name: 'Личная информация', href: '/resume' },
  { name: 'Специализация', href: '#' },
  { name: 'Опыт работы', href: '#' },
  { name: 'Образование', href: '#'},
  { name: 'Контакты', href: '#'},
]
const user = ref({
  selectedDivision: null,
  selectedQualification: null,
  selectedCurrency: null,
  email: '',
  telegram: '',
  phone: '',
  web: '',
  skill: [],
  experience: [{
    nameCompany: '',
    locationCompany: '',
    selectedDivision: null,
    selectedQualification: null,
  }]
})
const currencyList = computed(() => {
  return directoriesStore?.currencyList || []
})
const qualificationList = computed(() => {
  return directoriesStore?.qualificationList || []
})
const employmentTypeList = computed(() => {
  return directoriesStore?.employmentTypeList || []
})
const divisionList = computed(() => {
  return directoriesStore?.divisionList || []
})
const cityList = computed(() => {
  return directoriesStore?.cityList || []
})
const skillList = computed(() => {
  return directoriesStore?.skillList || []
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

const addTagSkill = (newTag) => {
  // this.options.push(newTag)
  user.value.skill.push(newTag)
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    directoriesStore.fillCurrencyList(),
    directoriesStore.fillCityList(),
    directoriesStore.fillSkillList(),
    directoriesStore.fillEmploymentTypeList(),
    directoriesStore.fillDivisionList(),
    directoriesStore.fillQualificationList(),
    directoriesStore.fillSearchStatusList(),
  ]).finally(() => {
    isLoading.value = false
  });
})
</script>

<style scoped>
:deep(.multiselect__input) {
  font-size: 14px;
  outline: none;
  box-shadow: none;
}
:deep(.multiselect__tags) {
  @apply block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6;
}
:deep(.multiselect__option) {
  font-size: 0.875rem;
  height: 30px;
  &:after {
    display: none;
  }
}
:deep(.multiselect__single) {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  margin-top: 0.2rem;
}
</style>
