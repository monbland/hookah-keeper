import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import History from '../components/history.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/history',
    name: 'history',
    component: History,
  },
]

const router = new VueRouter({
  routes,
})

export default router
