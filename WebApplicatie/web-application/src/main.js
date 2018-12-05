import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Page from './components/Body/Page'
import Menu from "./components/Body/Pages/Menu";
import Reserves from "./components/Body/Pages/Reserves";
import Dishes from "./components/Body/Pages/Dishes";
import Stock from "./components/Body/Pages/Stock";
Vue.use(BootstrapVue)
Vue.use(VueRouter)
const routes = [
  {path: '', redirect: '/home'},
  {path: '/home', component: App},
  {path: '/', redirect: '/home'},
  {path: '/reserveringen', component: Reserves},
  {path: '/menu', component: Menu},
  {path: '/gerechten', component: Dishes },
  {path: '/voorraad', component: Stock},
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
