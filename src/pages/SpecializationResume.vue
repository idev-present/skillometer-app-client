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
                Специализация
              </h1>
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8">
                  <!--Заголовок с описанием-->
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Специлизация</h2>
                    <p class="mt-1 text-sm text-gray-500">
                      Заполните данные, чтобы мы могли рекомендовать вам вакансии, а вас — эйчарам и рекрутерам.
                    </p>
                  </div>
                  <!--Готовность к работе/Квалификация-->
                  <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <Listbox as="div" v-model="user.selectedSearchStatus">
                        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                          Готовность к работе
                        </ListboxLabel>
                        <div class="relative mt-0.5">
                          <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 sm:text-sm sm:leading-6">
                            <span class="block truncate">{{ user?.selectedSearchStatus?.name || '&nbsp;' }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                          </ListboxButton>
                          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              <ListboxOption as="template" v-for="(type, index) in searchStatusList" :key="index" :value="type" v-slot="{ active, selected }">
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
                      <span v-if="errors?.search_status_id" class="text-red-600 text-sm">
                        {{errors.search_status_id}}
                      </span>
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
                      <span v-if="errors?.qualification_id" class="text-red-600 text-sm">
                        {{errors.qualification_id}}
                      </span>
                    </div>
                  </div>
                  
                  <!--Специализация/зп-->
                  <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <Combobox
                        as="div"
                        v-model="user.selectedDivision"
                        @update:modelValue="queryDivision = ''"
                      >
                      <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                        Специализация
                      </ComboboxLabel>
                      <div class="relative mt-0.5">
                        <ComboboxButton class="relative w-full">
                          <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-8 text-gray-900 shadow-sm ring-1 outline-0 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :display-value="(item) => item?.name || item"
                            @change="queryDivision = $event.target.value"
                            @blur="queryDivision = ''"
                          />
                          <div class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                        </ComboboxButton>
                        <ComboboxOptions v-if="filteredDivision?.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <ComboboxOption v-for="(item, index) in filteredDivision" :key="index" :value="item" as="template" v-slot="{ active, selected }">
                            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-blue-600 text-white' : 'text-gray-900']">
                              <span :class="['block truncate', selected && 'font-semibold']">
                                {{ item.name }}
                              </span>
                              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-blue-600']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ComboboxOption>
                        </ComboboxOptions>
                      </div>
                      </Combobox>
                    </div>

                    <div class="col-span-12 sm:col-span-6">
                      <label class="block text-sm font-medium leading-6 text-gray-900">
                        Зарплата
                      </label>
                      <div class="flex items-center">
                        <input name="price"
                               class="block mr-2 w-full rounded-md border-0 py-[5px] mt-0.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                               @input="inputPrice"
                               :value="user.price"
                               placeholder="От"
                        />
                        <Listbox as="div" v-model="user.selectedCurrency">
                          <div class="relative mt-0.5 w-[64px]">
                            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 sm:text-sm sm:leading-6">
                              <span class="block truncate">{{ user?.selectedCurrency?.value || '&nbsp;' }}</span>
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
                      <span v-if="errors?.salary_from" class="text-red-600 text-sm">
                        {{errors.salary_from}}
                      </span>
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
                          v-model="user.skill"
                          placeholder="Найдите или добавьте тег"
                          :show-labels="false"
                          label="name"
                          track-by="id"
                          :options="skillList"
                          :multiple="true"
                          :taggable="true"
                          @tag="addTagSkill"
                      />
                      <span v-if="errors?.skill_set" class="text-red-600 text-sm">
                        {{errors.skill_set}}
                      </span>
                    </div>
                  </div>

                  <!--дополнительно-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <label class="block text-sm font-medium leading-6 text-gray-900">
                        Дополнительно
                      </label>
                      <div class="mt-1 relative flex items-start">
                        <div class="flex h-6 items-center">
                          <input id="relocation"
                                 aria-describedby="comments-description"
                                 v-model="user.isRelocation"
                                 name="relocation"
                                 type="checkbox"
                                 class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>
                        <div class="ml-3 text-sm leading-6">
                          <label for="relocation" class="font-medium text-gray-900">Готов к переезду</label>
                        </div>
                      </div>
                      <div class="mt-1 relative flex items-start">
                        <div class="flex h-6 items-center">
                          <input
                              id="remote"
                              aria-describedby="candidates-description"
                              v-model="user.isRemove"
                              name="remote"
                              type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>
                        <div class="ml-3 text-sm leading-6">
                          <label for="remote" class="font-medium text-gray-900">Готов к удаленной работе</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--сохранить-->
                <div class="flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                  <button @click="saveForm" type="button" class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
                    Сохранить
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
  Listbox,
  ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,
  Combobox,
  ComboboxLabel,
  ComboboxButton,
  ComboboxInput, ComboboxOption, ComboboxOptions,
} from '@headlessui/vue'
import {
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  UserCircleIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid/index.js";
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {BriefcaseIcon} from "@heroicons/vue/20/solid";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css"
import SpecializationForm from "@/app/forms/SpecializationForm.js";

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
const user = ref({
  selectedSearchStatus: null,
  selectedQualification: null,
  skill: [],
  selectedCurrency: null,
  selectedDivision: null,
  price: '',
  isRelocation: false,
  isRemove: false,
})

const errors = ref({
  salary_from: '',
  currency: '',
  search_status_id: '',
  qualification_id: '',
  division_id: '',
  skill_set: '',
})

const queryDivision = ref('')

const searchStatusList = computed(() => {
  return directoriesStore?.searchStatusList || []
})
const currencyList = computed(() => {
  return directoriesStore?.currencyList || []
})
const qualificationList = computed(() => {
  return directoriesStore?.qualificationList || []
})
const skillList = computed(() => {
  return directoriesStore?.skillList || []
})
const divisionList = computed(() => {
  return directoriesStore?.divisionList || []
})

const filteredDivision = computed(() => {
  return queryDivision.value === ''
      ? divisionList.value
      : divisionList?.value?.filter((item) => {
    return item.name.toLowerCase().includes(queryDivision.value.toLowerCase())
  }) || []
})

const inputPrice = (event) => {
  const regex = /^(\d+(\.\d{0,2})?)?$/;
  const newValue = event.target.value;
  if (regex.test(newValue)) {
    user.value = {
      ...user.value,
      price: newValue
    }
  } else {
    event.target.value = user.value.price;
  }
}

const addTagSkill = (newTag) => {
  user.value.skill.push(newTag)
}

const saveForm = async () => {
  const skills = user.value?.skill?.map((item => item.id) || []).join(',');
  const payload = {
    salary_from: Number(user?.value?.price || 0),
    currency: user?.value?.selectedCurrency?.key || '',
    is_relocation: user?.value?.isRelocation || false,
    is_remote: user?.value?.isRemove || false,
    search_status_id: user?.value?.selectedSearchStatus?.id || '',
    qualification_id: user?.value?.selectedQualification?.id || '',
    division_id: user?.value?.selectedDivision?.id || '',
    skill_set: skills
  }
  errors.value = SpecializationForm.validate(payload)
  if(!errors.value && !isLoading.value) {
    isLoading.value = true
    await applicantStore.updateApplicant(payload)
    isLoading.value = false
  }
}

const loadDirectories = async () => {
  if(!directoriesStore?.searchStatusList?.length) {
    await directoriesStore.fillSearchStatusList()
  }
  if(!directoriesStore?.skillList?.length) {
    await directoriesStore.fillSkillList()
  }
  if(!directoriesStore?.qualificationList?.length) {
    await directoriesStore.fillQualificationList()
  }
  if(!directoriesStore?.divisionList?.length) {
    await directoriesStore.fillDivisionList()
  }
  if(!directoriesStore?.currencyList?.length) {
    await directoriesStore.fillCurrencyList()
  }
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    loadDirectories()
  ]).finally( async () => {
    await applicantStore.getApplicant().finally(() => {
      const res = applicantStore.applicant
      user.value = {
        selectedSearchStatus: searchStatusList?.value?.find((e) => e.id === res?.search_status_id) || null,
        selectedQualification: qualificationList?.value?.find((e) => e.id === res?.qualification_id) || null,
        price: res?.salary_from || '',
        selectedCurrency: currencyList?.value?.find((e) => e.key === res?.currency?.key) || currencyList?.value[0] || null,
        selectedDivision: divisionList?.value?.find((e) => e.id === res?.division_id) || null,
        skill: skillList?.value?.filter((obj) => res?.skill_set?.includes(obj.id)) || null,
        isRelocation: res?.is_relocation || false,
        isRemove: res?.is_remote || false,
      }
    })
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
