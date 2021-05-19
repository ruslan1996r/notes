import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login.vue"
import Registration from "../views/Registration.vue"
import Main from "../views/Main.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: "login",
    component: Login
  },
  {
    path: '/registration',
    name: "registration",
    component: Registration
  },
  {
    path: '/main',
    name: "Main",
    component: Main
  },
  {
    path: "/*",
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active"
})

export default router