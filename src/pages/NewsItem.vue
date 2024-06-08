<template>
  <div class="">
    <nav class="sm:hidden" aria-label="Back">
      <router-link
        to="/news"
        class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
        <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />Назад</router-link>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-2">
        <li>
          <div class="flex">
            <router-link
              to="/news"
              class="text-sm font-medium text-gray-500 hover:text-gray-700">Новости</router-link>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <span class="ml-2 text-sm font-medium text-gray-700">{{news.title}}</span>
          </div>
        </li>
      </ol>
    </nav>
    <div
      class="mt-4 bg-white py-4 px-4 sm:px-6 sm:py-6 rounded-xl shadow-sm ring-1 ring-gray-900/5"
    >
      <h1
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        JavaScript for Beginners
      </h1>
      <p class="mt-6 text-xl leading-8">
        Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
        arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
        feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
        Eleifend egestas fringilla sapien.
      </p>
      <div class="mt-10">
        <p>
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim
          sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis
          id.
        </p>
        <ul role="list" class="mt-8 space-y-8 text-gray-600">
          <li class="flex gap-x-3">
            <CheckCircleIcon
              class="mt-1 h-5 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            <span
              ><strong class="font-semibold text-gray-900">Data types.</strong>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.</span
            >
          </li>
          <li class="flex gap-x-3">
            <CheckCircleIcon
              class="mt-1 h-5 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            <span
              ><strong class="font-semibold text-gray-900">Loops.</strong> Anim
              aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
              cupidatat commodo.</span
            >
          </li>
          <li class="flex gap-x-3">
            <CheckCircleIcon
              class="mt-1 h-5 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            <span
              ><strong class="font-semibold text-gray-900">Events.</strong> Ac
              tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
              magna sit morbi lobortis.</span
            >
          </li>
        </ul>
        <p class="mt-8">
          Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio
          id et. Id blandit molestie auctor fermentum dignissim. Lacus diam
          tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
          adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel
          integer orci.
        </p>
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">
          From beginner to expert in 3 hours
        </h2>
        <p class="mt-6">
          Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
          in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
          mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
          tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
          Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
          diam.
        </p>
        <figure class="mt-10 border-l border-indigo-600 pl-9">
          <blockquote class="font-semibold text-gray-900">
            <p>
              “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
              purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
              aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
              tristique.”
            </p>
          </blockquote>
          <figcaption class="mt-6 flex gap-x-4">
            <img
              class="h-6 w-6 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div class="text-sm leading-6">
              <strong class="font-semibold text-gray-900">Maria Hill</strong> –
              Marketing Manager
            </div>
          </figcaption>
        </figure>
        <p class="mt-10">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>
      </div>
      <figure class="mt-16 flex justify-center">
        <img
          class="max-h-96 aspect-video rounded-xl bg-gray-50 object-cover"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
          alt=""
        />
      </figure>
      <div class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          Everything you need to get up and running
        </h2>
        <p class="mt-6">
          Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
          varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
          cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
          molestie. Gravida quis fringilla amet eget dui tempor dignissim.
          Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum
          convallis quam.
        </p>
        <p class="mt-8">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>
      </div>
    </div>
    
    <!-- Comments -->
    <div class="mt-4 bg-white py-4 px-4 sm:px-6 sm:py-6 rounded-xl shadow-sm ring-1 ring-gray-900/5">
      <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight border-b-2 pb-3">Комментарии</h2>
    
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ChevronRightIcon,
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
} from "@heroicons/vue/20/solid";

const news = ref({
    title: "Обзор изменений в законодательстве за май 2024 года",
    href: "#",
    description:
      "В обзоре изменений за май 2024 года рассмотрим следующие темы: критическая информационная инфраструктура, безопасность финансовых организаций и другие важные изменения в законодательстве в сфере ИТ и ИБ.",
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
  });
</script>