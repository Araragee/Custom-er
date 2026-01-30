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
    {
      path: '/demo/navigation',
      name: 'NavigationDemo',
      component: () => import('../views/demo/NavigationDemo.vue'),
    },
    {
      path: '/demo/data-display',
      name: 'DataDisplayDemo',
      component: () => import('../views/demo/DataDisplayDemo.vue'),
    },
    {
      path: '/demo/form-advanced',
      name: 'FormAdvancedDemo',
      component: () => import('../views/demo/FormAdvancedDemo.vue'),
    },
    {
      path: '/demo/overlay',
      name: 'OverlayDemo',
      component: () => import('../views/demo/OverlayDemo.vue'),
    },
    {
      path: '/demo/table',
      name: 'TableDemo',
      component: () => import('../views/demo/TableDemo.vue'),
    },
    {
      path: '/dashboard',
      name: 'DashboardExample',
      component: () => import('../views/DashboardExample.vue'),
    },
  ],
})

export default router
