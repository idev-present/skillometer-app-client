import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/app/store/modules/user';

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
      component: () => import('@/pages/Profile.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/specialization',
      name: 'SpecializationResume',
      component: () => import('@/pages/SpecializationResume.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/experience',
      name: 'ExperienceResume',
      component: () => import('@/pages/ExperienceResume.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/education',
      name: 'EducationResume',
      component: () => import('@/pages/EducationResume.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/contacts',
      name: 'ContactsResume',
      component: () => import('@/pages/ContactsResume.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/resume',
      name: 'Resume',
      component: () => import('@/pages/Resume.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/notification',
      name: 'Notification',
      component: () => import('@/pages/Notification.vue'),
      meta: {
        requiresAuth: true,
      }
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

// router.beforeEach((to, from, next) => {
//   const authStore = useUserStore();
//
//   if (to.meta.requiresAuth && !authStore.isAuth) {
//     next({ name: 'VacancyList' });
//   } else {
//     next();
//   }
// });

export default router
