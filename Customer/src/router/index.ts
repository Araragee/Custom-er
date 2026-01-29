import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/demo/button',
      name: 'ButtonDemo',
      component: () => import('../views/demo/ButtonDemo.vue'),
    },
    {
      path: '/demo/input',
      name: 'InputDemo',
      component: () => import('../views/demo/InputDemo.vue'),
    },
    {
      path: '/demo/toast',
      name: 'ToastDemo',
      component: () => import('../views/demo/ToastDemo.vue'),
    },
  ],
})

export default router
