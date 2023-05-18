import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/ltgh',
    name: 'ltgh',
    component: () => import(/* webpackChunkName: "about" */ '../views/ltgh/index.vue')
  },
  {
    path: '/ltpy',
    name: 'ltpy',
    component: () => import(/* webpackChunkName: "about" */ '../views/ltpy/index.vue')
  },
  {
    path: '/lthx',
    name: 'lthx',
    component: () => import(/* webpackChunkName: "about" */ '../views/lthx/index.vue')
  },
  {
    path: '/ltkh',
    name: 'ltkh',
    component: () => import(/* webpackChunkName: "about" */ '../views/ltkh/index.vue')
  },
  {
    path: '/ltjd',
    name: 'ltjd',
    component: () => import(/* webpackChunkName: "about" */ '../views/ltjd/index.vue')
  },
  {
    path: '/bzhx',
    name: 'bzhx',
    component: () => import(/* webpackChunkName: "about" */ '../views/bzhx/index.vue')
  },
  {
    path: '/gbhx',
    name: 'gbhx',
    component: () => import(/* webpackChunkName: "about" */ '../views/gbhx/index.vue')
  },
  {
    path: '/gwhx',
    name: 'gwhx',
    component: () => import(/* webpackChunkName: "about" */ '../views/gwhx/index.vue')
  },
  {
    path: '/gwhxTab',
    name: 'gwhxTab',
    component: () => import(/* webpackChunkName: "about" */ '../views/gwhx/gwhxTab.vue')
  },
  {
    path: '/gwhxTabDetail',
    name: 'gwhxTabDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/gwhx/gwhxTabDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
