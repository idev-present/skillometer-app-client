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
    }
  ]
})

export default router
