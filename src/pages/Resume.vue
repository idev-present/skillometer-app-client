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
              <h1 class="px-4 py-4 sm:p-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Резюме
              </h1>
                <div class="px-4 sm:px-6">
                        <div class="">
                          <dl class="grid grid-cols-1 sm:grid-cols-2">
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm font-medium leading-6 text-gray-900">Имя Фамилия </dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Должность</dd>
                            </div>
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm font-medium leading-6 text-gray-900">Игорь Журавлев</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Frontend Developer</dd>
                            </div>
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm font-medium leading-6 text-gray-900">Дата рождения</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Зарплата</dd>
                            </div>
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm font-medium leading-6 text-gray-900">11.11.2211</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">$120,000</dd>
                            </div>
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                              <dt class="text-sm font-medium leading-6 text-gray-900">About</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                            </div>
                          </dl>
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
  BellIcon,
  CogIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {BriefcaseIcon} from "@heroicons/vue/20/solid/index.js";
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
const user = ref()

onMounted(async () => {
  // isLoading.value = true
  // await Promise.all([
  //   directoriesStore.fillCurrencyList(),
  //   directoriesStore.fillCityList(),
  //   directoriesStore.fillSkillList(),
  //   directoriesStore.fillEmploymentTypeList(),
  //   directoriesStore.fillDivisionList(),
  //   directoriesStore.fillQualificationList(),
  //   directoriesStore.fillSearchStatusList(),
  // ]).finally(() => {
  //   isLoading.value = false
  // });
})
</script>