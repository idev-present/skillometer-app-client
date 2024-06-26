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
                      :class="[item.href === $route.path ? 'text-blue-500 group-hover:text-blue-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-1 mr-3 h-6 w-6 flex-shrink-0']"
                      aria-hidden="true"/>
                  <span class="truncate">{{ item.name }}</span>
                </router-link>
              </nav>
            </aside>

            <div v-if="!isLoading" class="divide-y divide-gray-200 lg:col-span-9">
              <h1 class="px-4 py-4 sm:p-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 border-b pb-3">
                Контакты
              </h1>
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8">
                  <!--Заголовок с описанием-->
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Контакты</h2>
                    <p class="mt-1 text-sm text-gray-500">
                      Укажите, как с вами могут связаться работодатели.
                    </p>
                  </div>
                  <!--Почта/Телефон-->
                  <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
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
                      <span v-if="errors?.email" class="text-red-600 text-sm">
                        {{ errors.email }}
                      </span>
                    </div>
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
                          v-maska="'+7(###)###-##-##'"
                          v-model="user.phone"
                          class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                      <span v-if="errors?.phone" class="text-red-600 text-sm">
                        {{ errors.phone }}
                      </span>
                    </div>
                  </div>
                </div>
                <!--сохранить-->
                <div class="flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                  <button @click="saveForm" type="button"
                          class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>

            <loading class="py-40 divide-y divide-gray-200 lg:col-span-9" v-else/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {useApplicantStore} from "@/app/store/modules/applican.js";
import Loading from "@/shared/Loading.vue";
import {
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  UserCircleIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'
import {BriefcaseIcon} from "@heroicons/vue/20/solid";
import ContactsForm from "@/app/forms/ContactsForm";
import { vMaska } from 'maska/vue'

const isLoading = ref(false)

//* store
const applicantStore = useApplicantStore()

const subNavigation = [
  { name: 'Профиль', href: '/profile', icon: UserCircleIcon },
  { name: 'Специализация', href: '/specialization', icon: CogIcon },
  { name: 'Опыт работы', href: '/experience', icon: BriefcaseIcon },
  { name: 'Образование', href: '/education', icon: AcademicCapIcon },
  { name: 'Контакты', href: '/contacts', icon: UserPlusIcon },
  { name: 'Резюме', href: '/resume', icon: WrenchScrewdriverIcon },
]
const user = ref({
  email: '',
  phone: '',
});
const errors = ref ({
  email: '',
  phone: '',
})

const saveForm = async () => {
  const cleaned = user?.value?.phone?.replace(/[^\d]/g, '') || ''
  const resPhone = cleaned.startsWith('7') ? cleaned.substring(1) : cleaned;
  const payload = {
    email: user?.value?.email || '',
    phone: resPhone || '',
  }
  errors.value = ContactsForm.validate(payload)
  if(!errors.value && !isLoading.value) {
    isLoading.value = true
    await applicantStore.updateContacts(payload).finally(() => {
      isLoading.value = false
    })
  }
}

onMounted(async () => {
  isLoading.value = true
  await applicantStore.getContacts().finally(() => {
    user.value = {
      email: applicantStore?.contacts?.email || '',
      phone: applicantStore?.contacts?.phone || '',
    }
    isLoading.value = false
  })
})
</script>
