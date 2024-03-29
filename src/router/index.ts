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
  { path: '/tests-list', component: () => import('../views/TestsList.vue') },
  { path: '/classroom', component: () => import('../views/ClassroomList.vue') },
  { path: '/test-result/:id', component: () => import('../views/TestResult.vue') },
  {
    path: '/dashboard',
    component: () => import('../views/TeacherDashboard.vue'),
    children: [
      { path: '', component: () => import('../views/TeacherDashboardContent.vue') },
      {
        path: 'items-list/:id',
        component: () => import('../views/TeacherDashboardItems.vue'),
      },
      {
        path: 'items-detail/:id',
        component: () => import('../views/TeacherDashboardItemsDetail.vue'),
      },
      {
        path: 'add-items',
        component: () => import('../views/TeacherDashboardAddItems.vue'),
      },
      { path: 'class-detail/:id', component: () => import('../views/TeacherDashboardClasses.vue') },
      { path: 'grade-score/:id', component: () => import('../views/TeacherDashboardGradeSubject.vue') },
    ],
  },

  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
