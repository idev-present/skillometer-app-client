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
                    Профиль
                  </h1>
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8">
                  <!--Заголовок с описанием-->
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Личная информация</h2>
                    <p class="mt-1 text-sm text-gray-500">
                      Эта информация будет отображаться только работодателям
                    </p>
                  </div>
                  <!--Аватар-->
                  <div class="mt-4 col-span-full flex items-center gap-x-8">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                    <div>
                      <button type="button"
                              class="mt w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
                        Загрузить аватарку
                      </button>
                      <p class="mt-2 text-xs leading-5 text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                  <!--Имя/Фамилия-->
                  <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
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
                      <span v-if="errors?.firstName" class="text-red-600 text-sm">
                        {{errors.firstName}}
                      </span>
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
                      <span v-if="errors?.lastName" class="text-red-600 text-sm">
                        {{errors.lastName}}
                      </span>
                    </div>
                  </div>
                  <!--Пол-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <label
                          class="block text-sm font-medium leading-6 text-gray-900">
                        Пол
                      </label>
                      <div class="mt-1 space-y-2">
                        <div class="flex items-center gap-x-3">
                          <input
                              id="male"
                              v-model="user.gender"
                              value="male"
                              name="male"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <label for="male" class="block text-sm font-medium leading-6 text-gray-900">
                            Мужской
                          </label>
                        </div>
                        <div class="flex items-center gap-x-3">
                          <input
                              id="female"
                              v-model="user.gender"
                              value="female"
                              name="female"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <label for="female" class="block text-sm font-medium leading-6 text-gray-900">
                            Женский
                          </label>
                        </div>
                        <span v-if="errors?.gender" class="text-red-600 text-sm">
                          {{errors.gender}}
                        </span>
                      </div>
                    </div>
                  </div>
                  <!--Дата рождения-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12 sm:col-span-6">
                      <label
                          class="block mb-1 text-sm font-medium leading-6 text-gray-900">
                        Дата рождения
                      </label>
                      <VueDatePicker
                          v-model="user.date"
                          format="dd.MM.yyyy"
                          auto-apply
                          locale="ru-RU"
                          text-input
                      />
                      <span v-if="errors?.birthday" class="text-red-600 text-sm">
                          {{errors.birthday}}
                      </span>
                    </div>
                  </div>
                  <!--Город-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <Combobox
                        as="div"
                        v-model="user.city"
                        @update:modelValue="queryCity = ''"
                      >
                      <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                        Город
                      </ComboboxLabel>
                      <div class="relative mt-0.5">
                        <ComboboxButton class="relative w-full">
                          <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-8 text-gray-900 shadow-sm ring-1 outline-0 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :display-value="(item) => item?.name || item"
                            @change="queryCity = $event.target.value"
                            @blur="queryCity = ''"
                          />
                          <div class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                        </ComboboxButton>
                        <ComboboxOptions v-if="filteredCity?.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <ComboboxOption v-for="(item, index) in filteredCity" :key="index" :value="item" as="template" v-slot="{ active, selected }">
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
                      <span v-if="errors?.city" class="text-red-600 text-sm">
                          {{errors.city}}
                      </span>
                    </div>
                  </div>
                  <!--О себе-->
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <label
                          class="block text-sm font-medium leading-6 text-gray-900">
                        О себе
                      </label>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Расскажите о себе в подробностях. Минимальное количество символов — 50 <br/> (это примерно одно среднее предложение)
                      </p>
                      <textarea
                          v-model="user.description"
                          rows="4"
                          name="comment"
                          class="mt-2 block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6"
                      />
                      <span v-if="errors?.bio" class="text-red-600 text-sm">
                          {{errors.bio}}
                      </span>
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
import Loading from "@/shared/Loading.vue";
import {
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ProfileForm from "@/app/forms/ProfileForm.js";
import {useUserStore} from "@/app/store/modules/user.js";

const isLoading = ref(false)

//* store
const userStore = useUserStore()
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
  firstName: '',
  lastName: '',
  date: '',
  city: null,
  description: '',
  gender: ''
});
const errors = ref({
  firstName: '',
  lastName: '',
  date: '',
  city: '',
  description: '',
  gender: ''
})
const queryCity = ref('')

const cityList = computed(() => {
  return directoriesStore?.cityList || []
})

const filteredCity = computed(() => {
  return queryCity.value === ''
      ? cityList.value
      : cityList?.value?.filter((item) => {
    return item.name.toLowerCase().includes(queryCity.value.toLowerCase())
  }) || []
})

const saveForm = async () => {
  const payload = {
    avatar: user?.value?.avatar || '',
    gender: user?.value?.gender || '',
    first_name: user?.value?.firstName || '',
    last_name: user?.value?.lastName || '',
    birthday: user?.value?.date || '',
    city: user?.value?.city?.id || '',
    bio: user?.value?.description || '',
  }
  errors.value = ProfileForm.validate(payload)
  if(!errors.value && !isLoading.value) {
    isLoading.value = true
    await userStore.updateUser(payload).finally(() => {
      isLoading.value = false
    })
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
  ]).finally(() => {
    userStore.fillUser()
    user.value = {
      ...userStore.user,
      firstName: userStore?.user?.first_name || '',
      lastName: userStore?.user?.last_name || '',
      date: userStore?.user?.birthday || '',
      city: cityList?.value?.find((item) => item.id === (userStore?.user?.city || '')) || null,
      description: userStore?.user?.bio || '',
      gender: userStore?.user?.gender || ''
    }
    isLoading.value = false
  });
})
</script>

<style>
.dp__input {
  font-size: 14px !important;
}
</style>
