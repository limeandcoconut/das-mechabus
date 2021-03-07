import Vue from 'vue'
import Router from 'vue-router'
import { decodeJWT } from './utils'
Vue.use(Router)

import defaultLayout from './layouts/default.vue'

/**
 * Helper function for loading components
 * @param  {String} templateName    Name of the component to load
 * @return {Function<Promise>}      A Promise, in an function, in an enigma
 */
const loadPage = (templateName) => {
  return () => import(`./pages/${templateName}.vue`)
}

const home = loadPage('home')
const login = loadPage('login')
const fourOhFour = loadPage('fourohfour')

const routes = [
  { path: '/', component: defaultLayout, children: [
    { path: '/', component: home, name: 'home', meta: { requiresAuth: true } },
    { path: '/login', component: login, name: 'login' },
  ] },
  { path: '/', component: defaultLayout, children: [
    { path: '*', component: fourOhFour, meta: { isFourOhFour: true } },
  ] },
]

const options = {
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  },
}

export default () => {
  const router = new Router(options)
  router.beforeEach(async (to, from, next) => {
    const jwt = localStorage.getItem('jwt')
    const jwtValid = jwt && decodeJWT(jwt).exp > Date.now()
    if (to.matched.some(({ meta: { requiresAuth } }) => requiresAuth)) {
      if (!jwtValid) {
        next({
          path: '/login',
        })
        return
      }
    }
    if (jwtValid && to.matched.some(({ path }) => path === '/login')) {
      next({
        path: '/',
      })
      return
    }
    next()
  })
  return router
}
