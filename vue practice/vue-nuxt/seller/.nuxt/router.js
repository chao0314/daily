import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1a2e4fd7 = () => interopDefault(import('..\\pages\\goods.vue' /* webpackChunkName: "pages_goods" */))
const _6094666a = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _a090f862 = () => interopDefault(import('..\\pages\\order.vue' /* webpackChunkName: "pages_order" */))
const _5e837ef6 = () => interopDefault(import('..\\pages\\shop.vue' /* webpackChunkName: "pages_shop" */))
const _d226795a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/goods",
      component: _1a2e4fd7,
      name: "goods"
    }, {
      path: "/login",
      component: _6094666a,
      name: "login"
    }, {
      path: "/order",
      component: _a090f862,
      name: "order"
    }, {
      path: "/shop",
      component: _5e837ef6,
      name: "shop"
    }, {
      path: "/",
      component: _d226795a,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
