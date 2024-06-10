<template>
  <div class="divide-y divide-gray-200">
    <div class="px-4 py-6 sm:p-6 lg:pb-8">
      <!--Заголовок с описанием-->
      <div>
        <h2 class="text-lg font-medium leading-6 text-gray-900">Специлизация</h2>
        <p class="mt-1 text-sm text-gray-500">
          Заполните данные, чтобы мы могли рекомендовать вам вакансии, а вас — эйчарам и рекрутерам.
        </p>
      </div>
      <!--Тип занятости/Квалификация-->
      <div class="mt-4 grid grid-cols-12 gap-6">
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
      <!--Специализация/зп-->
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
              <input id="relocation" aria-describedby="comments-description"
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
</template>
<script setup>
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid/index.js";
import {ref} from "vue";
import {useApplicantStore} from "@/app/store/modules/applican.js";
import Multiselect from "vue-multiselect";

const props = defineProps({
  employmentTypeList: {type: Array, default: []},
  qualificationList: {type: Array, default: []},
  skillList: {type: Array, default: []},
})

//* store
const applicantStore = useApplicantStore()

const user = ref({
  selectedEmploymentType: null,
  selectedQualification: null,
  skill: []
})

const addTagSkill = (newTag) => {
  // this.options.push(newTag)
  user.value.skill.push(newTag)
}

const saveForm = () => {
  console.log('form SpecializationResume', user.value)
  // applicantStore.createApplicant()
}
</script>
