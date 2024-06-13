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
                          <div class="px-4 py-6 sm:col-span-2 sm:px-0">
                          <dt class="text-xl font-medium leading-6 text-gray-900">Личная информация</dt>
                          <dl class="grid grid-cols-1 sm:grid-cols-2">
                            <div class=" border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Имя Фамилия </dt>
                                <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Пол</dd>
                            </div> 
                            <div class="border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm leading-6 text-gray-700">Игорь Журавлев</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Мужской</dd>
                            </div>
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm font-medium leading-6 text-gray-900">Дата рождения</dt>
                              <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Город</dd>
                            </div>
                            <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                              <dt class="text-sm leading-6 text-gray-700">11.11.2211</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Киров</dd>
                            </div>
                          </dl>
                          </div>
                            <div class="border-t border-b border-gray-200 px-4 py-6 sm:col-span-2 sm:px-0">
                              <dt class="text-xl font-medium leading-6 text-gray-900">О себе</dt>
                              <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Профессиональные навыки</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Технологии HTML/CSS(SCSS, SASS), БЭМ, JavaScript, PHP, Git, Node JS, Vue JS, React JS, Nuxt JS, Firebase, TypeScript, Flutter, WordPress, Docker, Leaflet. Работал с Jira, YouTrack и bitrix24. Хорошее знание немецкого языка. Английский язык читаю и перевожу со словарем.</dd>
                              <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Личные качества</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Ответственность, организованность, целеустремленность, трудолюбие, коммуникабельность, пунктуальность, умение работать в команде, быстрая обучаемость, аналитический склад ума.</dd>
                            </div>
                            <div class="border-b border-gray-200 px-4 py-6 sm:col-span-2 sm:px-0">
                              <dt class="text-xl font-medium leading-6 text-gray-900">Специализация</dt>
                              <dl class="grid grid-cols-1 sm:grid-cols-2">
                                <div class=" border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Квалификация</dd>
                                  <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Готовность к работе </dt>
                                </div> 
                                <div class="border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Средний (Middle)</dd>
                                  <dt class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">В активном поиске</dt>
                                </div>
                                <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dt class="text-sm font-medium leading-6 text-gray-900">Специализация</dt>
                                  <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Зарплата</dd>
                                </div>
                                <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dt class="text-sm leading-6 text-gray-700">Фронтенд разработчик</dt>
                                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">200000</dd>
                                </div>
                                <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dt class="text-sm font-medium leading-6 text-gray-900">Дополнительно</dt>
                                </div>
                                <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dt class="text-sm leading-6 text-gray-700">Готов к переезду</dt>
                                </div>
                              </dl>
                            </div>
                            <div class="border-b border-gray-200 px-4 py-6 sm:col-span-2 sm:px-0">
                              <dt class="text-xl font-medium leading-6 text-gray-900">Опыт работы</dt>
                              <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Тестовая работа</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Инженер по ручному тестированию</dd>
                              <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Ваши обязанности и достижения</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Расскажите о своем опыте в подробностях. Минимальное количество символов — 50 Расскажите о своем опыте в подробностях. Минимальное количество символов — 50 Расскажите о своем опыте в подробностях. Минимальное количество символов — 50</dd>
                              <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Применяемые вами навыки</dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">nodejs typescript html</dd>
                              <div class="grid grid-cols-1 sm:grid-cols-2">
                                <div class="flex items-center">
                                  <CalendarIcon
                                    class="mr-2 h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                    />
                                  <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Начачло работы</dt>
                                </div>
                                <div class="flex items-center">
                                  <CalendarIcon
                                  class="mr-2 h-5 w-5 text-gray-500"
                                  aria-hidden="true"
                                  />
                                  <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Окончание работы</dt>
                                  </div>
                                <dd class="mt-1  text-sm leading-6 text-gray-700 sm:mt-2 ml-7">11.11.1111</dd>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 ml-7">22.22.2222</dd>
                              </div>
                            </div>
                            <div class="border-b border-gray-200 px-4 py-6 sm:col-span-2 sm:px-0">
                              <dt class="text-xl font-medium leading-6 text-gray-900">Образование</dt>
                              <dl class="grid grid-cols-1 sm:grid-cols-2">
                                <div class=" border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Университет</dd>
                                  <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Город</dt>
                                </div> 
                                <div class="border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Вятская государственная сельскохозяйственная академия</dd>
                                  <dt class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Киров</dt>
                                </div>
                                <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dt class="text-sm font-medium leading-6 text-gray-900">Специализация</dt>
                                  <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Факультет</dd>
                                </div>
                                <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                  <dt class="text-sm leading-6 text-gray-700">35.03.06</dt>
                                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Инженерный</dd>
                                </div>
                              </dl>
                                <div class="grid grid-cols-1 sm:grid-cols-2">
                                <div class="flex items-center">
                                  <CalendarIcon
                                    class="mr-2 h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                    />
                                  <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Начачло обучения</dt>
                                </div>
                                <div class="flex items-center">
                                  <CalendarIcon
                                  class="mr-2 h-5 w-5 text-gray-500"
                                  aria-hidden="true"
                                  />
                                  <dt class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Окончание обучения</dt>
                                  </div>
                                <dd class="mt-1  text-sm leading-6 text-gray-700 sm:mt-2 ml-7">11.11.1111</dd>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 ml-7">22.22.2222</dd>
                              </div>
                            </div>
                              <div class="px-4 py-6 sm:col-span-2 sm:px-0">
                                <dt class="text-xl font-medium leading-6 text-gray-900">Контакты</dt>
                                  <dl class="grid grid-cols-1 sm:grid-cols-2">
                                  <div class=" border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Электронная почта</dt>
                                    <dd class="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-2">Телефон</dd>
                                  </div> 
                                  <div class="border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                    <dt class="text-sm leading-6 text-gray-700">ya@ro.ru</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">+7(987)654-32-21</dd>
                                  </div>
                                </dl>
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
  BellIcon,
  CogIcon,
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