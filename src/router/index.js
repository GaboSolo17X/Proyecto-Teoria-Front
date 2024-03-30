import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/landingSimu.vue')
  },
  {
    path: '/simulador',
    name: 'simulador',
    component: () => import('../views/Simulador.vue')
  },
  {
    path: '/guia',
    name: 'guia',
    component: () => import('../views/Guia.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
