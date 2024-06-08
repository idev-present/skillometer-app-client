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
              <!-- Profile section -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div>
                  <h2 class="text-lg font-medium leading-6 text-gray-900">Резюме</h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Эта информация будет отображаться только работодателям
                  </p>
                </div>

<!--                <div class="col-span-full flex items-center gap-x-8">-->
<!--                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />-->
<!--                  <div>-->
<!--                    <button type="button" class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">Change avatar</button>-->
<!--                    <p class="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>-->
<!--                  </div>-->
<!--                </div>-->

                <div class="mt-3 flex flex-col lg:flex-row">
                  <div class="flex-grow space-y-3">
                    <div class="col-span-12 sm:col-span-6">
                      <label
                          for="first-name"
                          class="block text-sm font-medium leading-6 text-gray-900">
                        Имя
                      </label>
                      <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autocomplete="family-name"
                          v-model="user.firstName"
                          class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                      <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">
                        Фамилия
                      </label>
                      <input type="text"
                             name="last-name"
                             id="last-name"
                             autocomplete="first-name"
                             v-model="user.lastName"
                             class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                    <p class="text-sm font-medium leading-6 text-gray-900" aria-hidden="true">Аватарка</p>
                    <div class="mt-2 lg:hidden">
                      <div class="flex items-center">
                        <div class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full" aria-hidden="true">
                          <img class="h-full w-full rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        </div>
                        <div class="relative ml-5">
                          <input id="mobile-user-photo" name="user-photo" type="file" class="peer absolute h-full w-full rounded-md opacity-0" />
                          <label for="mobile-user-photo" class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500">
                            <span>Загрузить</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="relative hidden overflow-hidden rounded-full lg:block">
                      <img class="relative mt-1 h-28 w-28 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <label for="desktop-user-photo" class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                        <span>Загрузить</span>
                        <input type="file" id="desktop-user-photo" name="user-photo" class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mt-3 grid grid-cols-12 gap-6">
                  <div class="col-span-12 sm:col-span-6">
                    <Listbox as="div" v-model="user.selectedEmploymentType">
                      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                        Тип занятости
                      </ListboxLabel>
                      <div class="relative mt-0.5">
                        <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 sm:text-sm sm:leading-6">
                          <span class="block truncate">{{ user?.selectedEmploymentType?.name || '&nbsp;' }}</span>
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

                <div class="mt-3 grid grid-cols-12 gap-6">
                  <div class="col-span-12 sm:col-span-6">
                    <Listbox as="div" v-model="user.selectedDivision">
                      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                        Профессиональные навыки
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
                  </div>
                </div>
              </div>

              <!-- Privacy section -->
              <div class="divide-y divide-gray-200 pt-6">
                <div class="px-4 sm:px-6">
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Privacy</h2>
                    <p class="mt-1 text-sm text-gray-500">Ornare eu a volutpat eget vulputate. Fringilla commodo amet.</p>
                  </div>
                  <ul role="list" class="mt-2 divide-y divide-gray-200">
                    <SwitchGroup as="li" class="flex items-center justify-between py-4">
                      <div class="flex flex-col">
                        <SwitchLabel as="p" class="text-sm font-medium leading-6 text-gray-900" passive>Available to hire</SwitchLabel>
                        <SwitchDescription class="text-sm text-gray-500">Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.</SwitchDescription>
                      </div>
                      <Switch  :class="[true ? 'bg-teal-500' : 'bg-gray-200', 'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2']">
                        <span aria-hidden="true" :class="[true ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                      </Switch>
                    </SwitchGroup>
                  </ul>
                </div>

                <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                  <button type="button"
                          class="w-full sm:w-fit border rounded-md bg-white px-5 py-2.5 text-sm font-semibold tr text-gray-600 shadow-sm hover:bg-gray-100 outline-0">
                    Отменить
                  </button>
                  <button type="button" class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
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
  ListboxButton, ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from '@headlessui/vue'
import {
  BellIcon,
  CogIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid/index.js";

const isLoading = ref(false)

//* store
const applicantStore = useApplicantStore()
const directoriesStore = useDirectoriesStore()

const subNavigation = [
  { name: 'Профиль', href: '/profile', icon: UserCircleIcon },
  { name: 'Резюме', href: '/resume', icon: CogIcon },
  { name: 'Уведомления', href: '/notification', icon: BellIcon },
]
const user = ref({
  firstName: '',
  lastName: '',
  selectedDivision: null,
  selectedEmploymentType: null,
  selectedQualification: null,
  selectedCurrency: null
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

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    directoriesStore.fillCurrencyList(),
    directoriesStore.fillCityList(),
    directoriesStore.fillEmploymentTypeList(),
    directoriesStore.fillDivisionList(),
    directoriesStore.fillQualificationList(),
  ]).then(() => {
    // await applicantStore.fillApplicantList().then((res) => {
    // })
  });
  const res = {
    "id": "ichiro18",
    "user_id": "uuid",
    "title": "Илья Журавлев",
    "salary_from": 400000,
    "currency": "RUR",
    "qualification_id": "middle",
    "division_id": "frontend_developer",

    "age": 29,
    "experience": "8 лет и 7 месяцев",
    "is_relocation": false,
    "is_remote": true,
    "last_visited": "2024-06-08T16:54:15",
    "registered_at": "2024-06-08T16:54:16",
    "search_status_id": "passive",
    "city_id": "kirov",
    "skill_set": "typescript,html,vue,javascript"
  }
  user.value = {
    ...res,
    firstName: res?.title?.split(' ')[0] || '',
    lastName: res?.title?.split(' ')[1] || '',
  }
  isLoading.value = false
})
</script>
