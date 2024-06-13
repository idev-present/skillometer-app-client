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

            <div v-if="!isLoading" class="divide-y divide-gray-300 lg:col-span-9">
              <div class="px-4 py-4 sm:p-4 border-b pb-3 flex justify-between items-center">
                <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Опыт работы
                </h1>
                <router-link
                    class="cursor-pointer font-bold text-sm text-blue-600 hover:text-blue-700"
                    to="/experience/new"
                >
                  Добавить опыт работы
                </router-link>
              </div>
              <div
                  v-for="(item, index) in worksList"
                  :key="index"
                  class=""
              >
                <div class="px-4 py-6 sm:p-6 lg:pb-8">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 text-lg font-bold leading-6 text-gray-900">
                      {{item.company_name}}
                    </div>
                    <div class="col-span-12 mt-0.5 text-sm leading-6 text-gray-700">{{item.position}}</div>
                  </div>
                  <div class="pt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <div class="text-sm font-medium leading-6 text-gray-900">Ваши обязанности и достижения</div>
                      <div class="mt-0.5 text-sm leading-6 text-gray-700">{{item.description}}</div>
                    </div>
                  </div>
                  <div class="pt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-6">
                      <div class="text-sm font-medium leading-6 text-gray-900">Начало работы</div>
                      <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                        <CalendarIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                            aria-hidden="true"
                        />
                        {{formatDate(item.start_date)}}
                      </div>
                    </div>
                    <div class="col-span-6">
                      <div class="text-sm font-medium leading-6 text-gray-900">Окончание работы</div>
                      <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                        <CalendarIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                            aria-hidden="true"
                        />
                        {{formatDate(item?.end_date) || 'По настоящее время'}}
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 grid grid-cols-12 gap-6">
                    <div class="col-span-12">
                      <div class="text-sm font-medium leading-6 text-gray-900">Применяемые вами навыки</div>
                      <div class="mt-0.5 text-sm leading-6 text-gray-700 flex items-center">
                        <div
                            v-for="(skill, indexSkills) in item.skills"
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
                      </div>
                    </div>
                  </div>
                  <div class="pt-5 grid grid-cols-12 gap-6">
                    <div class="col-span-12 flex items-center">
                      <div class="flex text-sm items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                        <PencilIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0"
                            aria-hidden="true"
                        />
                        Редактировать
                      </div>
                      <div class="ml-5 text-sm flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                        <TrashIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0"
                            aria-hidden="true"
                        />
                        Удалить
                      </div>
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
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  UserCircleIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import {useDirectoriesStore} from "@/app/store/modules/directories.js";
import {BriefcaseIcon, CalendarIcon} from "@heroicons/vue/20/solid";

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

const skillList = computed(() => {
  return directoriesStore?.skillList || []
})
const divisionList = computed(() => {
  return directoriesStore?.divisionList || []
})
const worksList = computed(() => {
  return applicantStore?.worksList?.map((item) => ({
    ...item,
    skills: item?.skill_set?.split(",") || [],
  })) || []
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();

  // Форматируем дату в нужный формат
  return `${day}.${month}.${year}`;
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    directoriesStore.fillDivisionList(),
    directoriesStore.fillSkillList(),
  ]).finally(() => {
    applicantStore.getWorksList()
    isLoading.value = false
  });
})
</script>
