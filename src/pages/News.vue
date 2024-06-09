<template>
  <div class="">
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
      Новости
    </h1>
    <!-- loading -->
    <div v-if="!isLoading" class="divide-y divide-gray-200 lg:col-span-9">
      <!-- post -->
      <router-link
        v-for="(item, index) in posts"
        :key="index"
        :to="`/news/${item.id}`"
      >
        <article
          class="hover:bg-gray-50 mt-4 bg-white py-4 px-4 sm:px-6 sm:py-6 rounded-xl relative isolate flex flex-col gap-8 lg:flex-row shadow-sm ring-1 ring-gray-900/5"
        >
          <div
            class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"
          >
            <img
              :src="item.imageUrl"
              alt=""
              class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div
              class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
            />
          </div>
          <div class="w-full flex justify-between flex-col">
            <div>
              <div class="flex items-center gap-x-4 text-xs">
              <div class="text-gray-500">{{ item.date }}</div>
              <div class="text-gray-500">{{ item.time }}</div>
            </div>
            <div class="group relative mt-1.5">
              <h3 class=" text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a :href="item.href">
                  <span class="absolute inset-0" />
                  {{ item.title }}
                </a>
              </h3>
              <p class="mt-4 text-sm leading-6 text-gray-600 line-clamp-4">{{ item.description }}</p>
            </div>
            </div>
            <div class="flex pt-4">
              <div class="relative flex items-center gap-x-4">
                <img
                  :src="item.author.imageUrl"
                  alt=""
                  class="h-10 w-10 rounded-full bg-gray-50"
                />
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">
                    <a :href="item.author.href">
                      <span class="absolute inset-0" />
                      {{ item.author.name }}
                    </a>
                  </p>
                  <p class="text-gray-600">{{ item.author.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </router-link>
    </div>
  <loading v-else class="py-40 divide-y divide-gray-200 lg:col-span-9" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loading from "@/shared/Loading.vue";
const isLoading = ref(false)

const posts = ref([
  {
    id: 1,
    title: "Обзор изменений в законодательстве за май 2024 года",
    href: "#",
    description:
      "В Штатах выяснили, какие американские университеты самые изобретательные, Apple будет следить за положением головы и расположением на ней наушников, а Dodo Pizza попытается заставить Telegram изжить в себе захват юзернеймов. Все главные новости в сфере интеллектуальной собственности за неделю — в нашем дайджесте. В Штатах выяснили, какие американские университеты самые изобретательные, Apple будет следить за положением головы и расположением на ней наушников, а Dodo Pizza попытается заставить Telegram изжить в себе захват юзернеймов. Все главные новости в сфере интеллектуальной собственности за неделю — в нашем дайджесте.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    time: "10:20",
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title:
      "Контроль осанки от Apple, рейтинг университетов и суд на опережение: дайджест главных новостей",
    href: "#",
    description:
      "В Штатах выяснили, какие американские университеты самые изобретательные, Apple будет следить за положением головы и расположением на ней наушников, а Dodo Pizza попытается заставить Telegram изжить в себе захват юзернеймов. Все главные новости в сфере интеллектуальной собственности за неделю — в нашем дайджесте. В Штатах выяснили, какие американские университеты самые изобретательные, Apple будет следить за положением головы и расположением на ней наушников, а Dodo Pizza попытается заставить Telegram изжить в себе захват юзернеймов. Все главные новости в сфере интеллектуальной собственности за неделю — в нашем дайджесте.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    time: "10:20",
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title:
      "Geometric Future представила Model 0 Flamingo — складной корпус Mini ITX на магнитах для ПК со встроенным GPU",
    href: "#",
    description:
      "В Штатах выяснили, какие американские университеты самые изобретательные, Apple будет следить за положением головы и расположением на ней наушников, а Dodo Pizza попытается заставить Telegram изжить в себе захват юзернеймов. Все главные новости в сфере интеллектуальной собственности за неделю — в нашем дайджесте. В Штатах выяснили, какие американские университеты самые изобретательные, Apple будет следить за положением головы и расположением на ней наушников, а Dodo Pizza попытается заставить Telegram изжить в себе захват юзернеймов. Все главные новости в сфере интеллектуальной собственности за неделю — в нашем дайджесте.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    time: "10:20",
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
]);
</script>
