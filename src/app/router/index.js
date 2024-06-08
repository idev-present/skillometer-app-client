import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vacancy',
      name: 'VacancyList',
      component: () => import('@/pages/VacancyList.vue')
    },
    {
      path: '/vacancy/:id',
      name: 'VacancyItem',
      component: () => import('@/pages/VacancyItem.vue')
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/pages/News.vue')
    },
    // System
    {
      path: '/',
      redirect: '/vacancy',
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundPage",
      component: () => import("@/pages/NotFoundPage.vue"),
      meta: {
        requiresAuth: false,
        layout: "system",
      },
    },
  ]
})

export default router
