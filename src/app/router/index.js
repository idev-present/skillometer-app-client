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
    {
      path: '/news/:id',
      name: 'NewsItem',
      component: () => import('@/pages/NewsItem.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/pages/Profile.vue')
    },
    {
      path: '/resume',
      name: 'Resume',
      component: () => import('@/pages/Resume.vue')
    },
    {
      path: '/notification',
      name: 'Notification',
      component: () => import('@/pages/Notification.vue')
    },
    {
      name: 'AuthCallback',
      path: import.meta.env.VITE_IAM_REDIRECT_URI,
      component: () => import('@/pages/AuthCallback.vue')
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
