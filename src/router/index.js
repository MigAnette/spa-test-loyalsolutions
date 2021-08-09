import Vue from 'vue'
import VueRouter from 'vue-router'
import Shops from '../views/Shops.vue'
import i18n from '../i18n';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}`,
  },
  {
    path: '/:lang',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/',
        name: 'Shops',
        component: Shops
      },
      {
        path: 'members',
        name: 'Members',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( '../views/Members.vue')
      },
      {
        path: 'signup',
        name: 'Signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( '../views/Signup.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
