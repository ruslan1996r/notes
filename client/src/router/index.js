import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'
import Login from "../views/Login.vue"
import Registration from "../views/Registration.vue"
import Main from "../views/Main.vue"
import Editor from "../views/Editor.vue"
import authMiddleware from "./authMiddleware"
import middlewarePipeline from "./middlewarePipeline"

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
    meta: {
      authRequired: true,
      middleware: [authMiddleware]
    },
    component: Main
  },
  {
    path: '/editor/:id',
    name: "Editor",
    meta: {
      authRequired: true,
      middleware: [authMiddleware]
    },
    component: Editor

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

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router