<template>
  <div class="mx-auto w-full max-w-7xl px-4 py-8 md:py-16 sm:px-6 lg:px-8">
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <router-link to="/vacancy" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Назад
        </router-link>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-2">
          <li>
            <div class="flex">
              <router-link to="/vacancy" class="text-sm font-medium text-gray-500 hover:text-gray-700">Вакансии</router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span class="ml-2 text-sm font-medium text-gray-700">{{vacancyItem.name}}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            {{vacancyItem.name}}
          </h2>
          <div class="mt-2 flex items-center font-bold text-sm text-green-600">
            250 000 &ndash; 800 000 ₽
          </div>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Полный рабочий день
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Удаленная
            </div>
          </div>
          <div class="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div v-for="(tag, index) in vacancyItem.tags" :key="index">
              {{tag}}
            </div>
          </div>
          <div class="mt-3 flex items-center text-sm text-gray-500">
            <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            7 июня
          </div>
        </div>
      </div>
    </div>
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="min-w-0 flex-1">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight border-b-2 pb-3">
            Описание вакансии
          </h2>
          <div class="mt-2 flex flex-col text-gray-900">
            <p class="text-lg font-bold">О компании и команде</p>
            <p class="mt-2 font-bold">Международная IT-компания, которая существует с 2006 года.</p>
            <div>
              <p class="mt-2">В данный момент мы развиваем веб-приложение Guider - это международный IT-стартап, мы создаём справочник компаний с картой городов в Коста-Рике.</p>
              <p class="mt-2">Помогаем жителям и туристам выбирать, как провести свой досуг и находить актуальную информацию о местных сервисах и услугах.</p>
              <p class="mt-2">Выпустили MVP, есть первые продажи подписок, находимся на предпосевной стадии финансирования.</p>
              <p class="mt-2">Все вопросы и предложения присылайте на этот адрес data@guider.pro</p>
            </div>
          </div>
          <div>
            <p class="mt-2 text-lg font-bold">Условия работы</p>
            <p class="mt-2 font-bold">На данный момент наш проект не приносит дохода, поэтому оплата за работу не предусмотрена.</p>
            <p class="mt-2">Вы можете самостоятельно выбрать, сколько времени будете уделять работе в нашей команде. </p>
            <p class="mt-2">Мы, безусловно, уделяем больше времени тем, кто достигает больших результатов и приносит больше пользы проекту.</p>
            <p class="mt-2">Вы будете работать под наставничеством непосредственно опытного Тимлида проекта.</p>
            <p class="mt-2">Перед началом работы необходимо подписать соглашение о передаче прав на продукт, с которым вы будете работать. Все имущественные права на созданные материалы принадлежат нашей компании.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="divide-y mt-3 divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="min-w-0 flex-1">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight border-b-2 pb-3">
            Ваш отклик
          </h2>
          <div class="mt-2 flex flex-col text-gray-900">
            <p class="text-lg font-bold">Сопроводительное письмо</p>
            <div>
              <p class="mt-2">Работодатель прежде всего смотрит на ваш профиль, но вы также можете сопроводить свой отклик парой слов, чтобы привлечь внимание к своим самым важным профессиональным или личным качествам.</p>
            </div>
              <div class="mt-3">
                <textarea rows="4" name="comment" id="comment" class="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6" />
              </div>
            <button type="button" class="mt-3 w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
              Откликнуться
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRightIcon, BriefcaseIcon, MapPinIcon, CalendarIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'

const vacancyItem = ref({
  name: 'Тестировщик роботизированных процессов',
  tags: ['Инженер по ручному тестированию', 'Node JS', 'Python'],
  location: 'Полный рабочий день',
  typeEmployment: 'Можно удалённо'
})
</script>
