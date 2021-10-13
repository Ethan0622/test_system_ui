import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/test-page',
    name: 'TestPage',
    component: () => import('../views/TestPage.vue'),
  },
  { path: '/items-list', name: 'ItemsList', component: () => import('../views/ItemsList.vue') },
  { path: '/items-detail/:id', name: 'ItemsDetail', component: () => import('../views/ItemsDetail.vue') },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
