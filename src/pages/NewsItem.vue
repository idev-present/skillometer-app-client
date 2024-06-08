<template>
  <div class="">
    <nav class="sm:hidden" aria-label="Back">
      <router-link
        to="/news"
        class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ChevronLeftIcon
          class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />Назад</router-link
      >
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-2">
        <li>
          <div class="flex">
            <router-link
              to="/news"
              class="text-sm font-medium text-gray-500 hover:text-gray-700"
              >Новости</router-link
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <ChevronRightIcon
              class="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span class="ml-2 text-sm font-medium text-gray-700">{{
              news.title
            }}</span>
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
      <ul role="list" class="space-y-4 mt-4">
        <li
          v-for="question in questions"
          :key="question.id"
          class="bg-white px-4 py-6 shadow-sm ring-1 ring-gray-900/5 sm:p-6 rounded-xl"
        >
          <article :aria-labelledby="'question-title-' + question.id">
            <div>
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="question.author.imageUrl"
                    alt=""
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900"><a :href="question.author.href" class="hover:underline">{{question.author.name}}</a></p>
                  <p class="text-sm text-gray-500">
                    <a :href="question.href" class="hover:underline">
                      <time :datetime="question.datetime">{{question.date}}</time>
                    </a>
                  </p>
                </div>
                <div class="flex flex-shrink-0 self-center"></div>
              </div>
              <h2
                :id="'question-title-' + question.id"
                class="mt-4 text-base font-medium text-gray-900">{{ question.title }}</h2>
            </div>
            <div
              class="mt-2 space-y-4 text-sm text-gray-700"
              v-html="question.body"
            />
            <div class="mt-6 flex justify-between space-x-8">
              <div class="flex space-x-6">
                <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <HandThumbUpIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="font-medium text-gray-900">{{
                      question.likes
                    }}</span>
                    <span class="sr-only">likes</span>
                  </button>
                </span>
                <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <ChatBubbleLeftEllipsisIcon
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                    <span class="font-medium text-gray-900">{{
                      question.replies
                    }}</span>
                    <span class="sr-only">replies</span>
                  </button>
                </span>
                <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <EyeIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="font-medium text-gray-900">{{
                      question.views
                    }}</span>
                    <span class="sr-only">views</span>
                  </button>
                </span>
              </div>
              <div class="flex text-sm">
                <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <ShareIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="font-medium text-gray-900">Share</span>
                  </button>
                </span>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ChatBubbleLeftEllipsisIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/vue/20/solid";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
} from "@heroicons/vue/20/solid";

const news = ref({
  title: "Обзор изменений в законодательстве за май 2024 года",
});
const questions = [
  {
    id: "1",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  {
    id: "2",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
];
</script>