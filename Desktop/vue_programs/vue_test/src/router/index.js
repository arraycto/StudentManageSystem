import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from "../App";
import PageOne from "../views/PageOne";
import index from "../views/index"
import PageTwo from "../views/PageTwo";
import PageThree from "../views/PageThree";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'nav',
    component: index,
    redirect: "/PageOne",
    children: [
      {
        path: '/PageOne',
        name: 'PageOne',
        component: PageOne
      },
      {
        path: '/PageTwo',
        name: 'PageTwo',
        component: PageTwo
      },
    ]
  },
  {
    path: '/nav',
    name: 'navi',
    component: index,
    children: [
      {
        path: '/PageThree',
        name: 'PageThree',
        component: PageThree
      },
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
