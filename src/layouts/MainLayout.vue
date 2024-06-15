<template>
  <div class="bg-gray-100 min-h-[100vh]">
    <header class="inset-x-0 bg-white z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex items-center justify-between w-full lg:justify-start">
          <div class="flex">
            <router-link to="/" class="-mx-1.5 -mt-2 p-1.5">
              <img class="h-8 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
            </router-link>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden ml-12 lg:flex lg:gap-x-8">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                         class="inline-flex items-center px-1 pt-1 text font-medium text-gray-500 hover:text-gray-800 transform"
                         :class="$route.path === item.href && 'text-gray-800'"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div v-if="isAuth" class="hidden lg:ml-6 lg:flex lg:items-center">
          <router-link to="/notification" class="relative mr-3 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="absolute top-0 right-0 bg-blue-600 text-white font-bold text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </router-link>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative">
            <div>
              <MenuButton class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none">
                <img v-if="userStore?.user?.avatar" class="h-8 w-8 min-w-8 rounded-full bg-gray-50" :src="userStore?.user?.avatar" alt="" />
                <span v-else class="inline-block h-8 w-8 -mt-1 min-w-8 overflow-hidden rounded-full bg-gray-100">
                  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <router-link :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                    {{ item.name }}
                  </router-link>
                </MenuItem>
                <MenuItem @click="logout" v-slot="{ active }">
                  <div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']">
                    Выйти
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div
            v-else
            @click="singIn"
            class="hidden lg:flex font-semibold cursor-pointer leading-6 text-gray-600 hover:text-gray-800 transform"
        >
          <ArrowLeftEndOnRectangleIcon class="h-6 w-6 mr-1" aria-hidden="true" />
          Войти
        </div>
<!--        <div-->
<!--            @click="singUp"-->
<!--            class="hidden lg:flex font-semibold cursor-pointer leading-6 text-gray-600 hover:text-gray-800 transform"-->
<!--        >-->
<!--          <ArrowLeftEndOnRectangleIcon class="h-6 w-6 mr-1" aria-hidden="true" />-->
<!--          Регистрация-->
<!--        </div>-->
      </nav>
      <!--mobile-->
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <router-link to="/" @click="mobileMenuOpen = false" class="-mx-1.5 -mt-2 p-1.5">
              <img class="h-8 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
            </router-link>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <router-link v-for="item in navigation"
                   :key="item.name"
                   :to="item.href"
                   @click="mobileMenuOpen = false"
                   class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  {{ item.name }}
                </router-link>
              </div>
              <div v-if="isAuth" class="border-t -mx-3 border-gray-200 pb-3 pt-4">
                <div class="flex items-center px-3">
                  <div class="flex-shrink-0">
                    <img v-if="userStore?.user?.avatar" class="h-8 w-8 rounded-full bg-gray-50" :src="userStore?.user?.avatar" alt="" />
                    <span v-else class="inline-block -mb-1.5 h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                      <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                  <div class="ml-3">
                    <div class="text-base font-medium text-gray-800">
                      {{userStore?.user?.first_name || ''}} {{userStore?.user?.last_name || ''}}
                    </div>
                    <div class="text-sm font-medium text-gray-500">
                      {{userStore?.user?.email || ''}}
                    </div>
                  </div>
                  <router-link to="/notification" @click="mobileMenuOpen = false" class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span class="absolute top-0 right-0 bg-blue-600 text-white font-bold text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      2
                    </span>
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                  </router-link>
                </div>
                <div class="space-y-2 py-6">
                  <router-link
                      v-for="item in userNavigation"
                      :key="item.name"
                      :to="item.href"
                      @click="mobileMenuOpen = false"
                      class="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {{ item.name }}
                  </router-link>
                  <div
                      @click="logout"
                      class="block cursor-pointer rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Выйти
                  </div>
                </div>
              </div>
              <div v-else class="pt-4">
                <div
                    @click="singIn"
                    class="flex items-center cursor-pointer rounded-lg py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <ArrowLeftEndOnRectangleIcon class="h-6 w-6 mr-1" aria-hidden="true" />
                  Войти
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
        <div class="text-xs absolute bottom-2 right-2 text-gray-400 z-50">
          v0.4.2
        </div>
      </Dialog>
    </header>
    <div class="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 md:py-16 sm:px-6 lg:px-8">
      {{ userTg }}
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import {RouterView, useRouter} from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import { Dialog, DialogPanel, MenuButton, Menu, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, BellIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline'
import {useUserStore} from "@/app/store/modules/user.js";
import iamService from "@/shared/services/iam.service.js";

const navigation = [
  { name: 'Вакансии', href: '/vacancy' },
  { name: 'Новости', href: '/news' },
]
const userNavigation = [
  { name: 'Профиль', href: '/profile' },
  { name: 'Резюме', href: '/resume' },
  { name: 'Отклики', href: '/reply' },
]
const isLoading = ref(false)

const userTg = ref('')

const router = useRouter()
//* store
const userStore = useUserStore()

const mobileMenuOpen = ref(false)

const isAuth = computed(() => {
  return userStore?.isAuth || false
})

const singIn = () => {
  const targetUrl = iamService.sdk.getSigninUrl()
  window.location.href = targetUrl
}

const singUp = () => {
  const targetUrl = iamService.sdk.getSignupUrl()
  window.location.href = targetUrl
}

const logout = async () => {
  isLoading.value = true
  await userStore.logout()
  isLoading.value = false
  mobileMenuOpen.value = false
  await router.push('/')
}

const getProfile = async () => {
  isLoading.value = true
  await userStore.fillUser().finally(() => {
    isLoading.value = false
  })
}

onMounted(async () => {
  await getProfile()
  const tg = window.Telegram.WebApp;

  // Получение данных о пользователе
  const user = tg.initDataUnsafe?.user;
  const userId = user?.id;
  const firstName = user?.first_name;
  const lastName = user?.last_name;
  const username = user?.username;
  const languageCode = user?.language_code;

  // Вывод данных в консоль
  console.log('User ID:', userId);
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName);
  console.log('Username:', username);
  console.log('Language Code:', languageCode);
  userTg.value = tg.initDataUnsafe?.user;
})
</script>
