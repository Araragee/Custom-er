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
  ],
})

export default router
