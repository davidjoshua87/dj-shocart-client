import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import History from './views/History.vue'

Vue.use(Router)

export default new Router({
routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/history',
    name: 'history',
    component: History
  }
]
})
