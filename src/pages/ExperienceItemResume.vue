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
                  <h1 class="px-4 py-4 sm:p-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 border-b pb-3">
                    Опыт работы
                  </h1>
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:p-6 lg:pb-8">
                  <!--Заголовок с описанием-->
                  <div>
                    <h2 class="text-lg font-medium leading-6 text-gray-900">
                      {{route?.params?.id === 'new' ? 'Добавление опыта работы' : 'Редактирование опыта работы'}}
                    </h2>
                  </div>
                  <div>
                    <!--Название компании/Должность-->
                    <div class="mt-4 grid grid-cols-12 gap-6">
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900">
                          Название компании
                        </label>
                        <input
                            type="text"
                            v-model="user.nameCompany"
                            class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        <span v-if="errors?.company_name" class="text-red-600 text-sm">
                          {{errors.company_name}}
                        </span>
                      </div>
                      <div class="col-span-12 sm:col-span-6">
                        <Combobox as="div"
                                  v-model="user.position">
                          <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                            Должность
                          </ComboboxLabel>
                          <div class="relative mt-1">
                            <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 outline-0 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                           @change="changePosition"
                                           :display-value="(item) => item?.name || item"
                            />
                            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </ComboboxButton>

                            <ComboboxOptions v-if="filteredPosition?.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              <ComboboxOption v-for="(item, index) in filteredPosition" :key="index" :value="item" as="template" v-slot="{ active, selected }">
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
                        <span v-if="errors?.position" class="text-red-600 text-sm">
                          {{errors.position}}
                        </span>
                      </div>
                    </div>
                    <!--Дата начала/конца-->
                    <div class="mt-4 grid grid-cols-12 gap-6">
                      <div class="col-span-12 sm:col-span-6">
                        <label
                            class="block mb-1 text-sm font-medium leading-6 text-gray-900">
                          Начало работы
                        </label>
                        <VueDatePicker
                            v-model="user.startDate"
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
                          Окончание работы
                        </label>
                        <VueDatePicker
                            v-model="user.endDate"
                            format="dd.MM.yyyy"
                            auto-apply
                            locale="ru-RU"
                        />
                        <span v-if="errors?.end_date" class="text-red-600 text-sm">
                          {{errors.end_date}}
                        </span>
                      </div>
                    </div>
                    <!--Ваши обязанности и достижения-->
                    <div class="mt-4 grid grid-cols-12 gap-6">
                      <div class="col-span-12">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900">
                          Ваши обязанности и достижения
                        </label>
                        <p class="mt-0.5 text-sm text-gray-500">
                          Расскажите о своем опыте в подробностях. Минимальное количество символов — 50 <br/> (это примерно одно среднее предложение)
                        </p>
                        <textarea
                            v-model="user.description"
                            rows="4"
                            name="comment"
                            class="mt-2 block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6"
                        />
                        <span v-if="errors?.description" class="text-red-600 text-sm">
                          {{errors.description}}
                        </span>
                      </div>
                    </div>
                    <!--Применяемые вами навыки-->
                    <div class="mt-4 grid grid-cols-12 gap-6">
                      <div class="col-span-12">
                        <label class="block text-sm font-medium leading-6 text-gray-900">
                          Применяемые вами навыки
                        </label>
                        <p class="mt-0.5 text-sm text-gray-500">
                          Укажите от 1 до 10 ваших профессиональных навыков, которые вы применяли на данной должности в компании.
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
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css"
import {useRoute, useRouter} from "vue-router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ExperienceForm from "@/app/forms/ExperienceForm.js";

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
const user = ref({
  nameCompany: '',
  position: '',
  startDate: '',
  endDate: null,
  description: '',
  skill: [],
});

const errors = ref({
  company_name: '',
  position: '',
  start_date: '',
  end_date: null,
  description: '',
  skill_set: ''
})

const queryPosition = ref('')

const filteredPosition = computed(() => {
  return queryPosition.value === ''
      ? divisionList?.value
      : divisionList?.value?.filter((item) => {
        return item.name.toLowerCase().includes(queryPosition.value.toLowerCase())
      })
})

const skillList = computed(() => {
  return directoriesStore?.skillList || []
})
const divisionList = computed(() => {
  return directoriesStore?.divisionList || []
})

const addTagSkill = (newTag) => {
  user.value.skill.push(newTag)
}

const changePosition = (event) => {
  queryPosition.value = event.target.value
  user.value.position = event.target.value
}

const saveForm = async () => {
  const skills = user.value?.skill?.map((item => item.id) || []).join(',');
  const payload = {
    company_name: user?.value?.nameCompany || '',
    position: user?.value?.position?.name || user?.value?.position || '',
    start_date: user?.value?.startDate || '',
    end_date: user?.value?.endDate || null,
    description: user?.value?.description || '',
    skill_set: skills
  }
  errors.value = ExperienceForm.validate(payload)
  if(!errors.value && !isLoading.value) {
    isLoading.value = true
    if(route.params.id === 'new') {
      await applicantStore.createWorkXp(payload).then(() => {
        applicantStore.getWorksList()
        router.push('/experience')
      }).finally(() => {
        isLoading.value = false
      })
    }
  }
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    directoriesStore.fillDivisionList(),
    directoriesStore.fillSkillList(),
  ]).finally(() => {
    if(route.params.id !== 'new') {
      console.log(777)
    }
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
.dp__input {
  font-size: 14px !important;
}
</style>
