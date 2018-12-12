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
import DishesNew from "./components/Body/Pages/DishesNew";
import ProductsNew from "./components/Body/Pages/ProductsNew";
import Dish_Product from "./components/Body/Pages/Dish_Product";
import DrinkNew from "./components/Body/Pages/DrinkNew";
import MenuMaker from "./components/Body/Pages/MenuMaker";
import Order from "./components/Body/Pages/Order";
Vue.use(BootstrapVue)
Vue.use(VueRouter)

//All the routes to the components that will be displayed in the router-view 
const routes = [
  {path: '', redirect: '/home'},
  {path: '/home', component: App},
  {path: '/', redirect: '/home'},
  {path: '/reserveringen', component: Reserves},
  {path: '/menu', component: Menu},
  {path: '/gerechten', component: Dishes },
  {path: '/voorraad', component: Stock},
  {path: '/voorraad/:sorting', component: Stock},
  {path: '/gerechten_nieuw', component: DishesNew},
  {path: '/producten_nieuw', component: ProductsNew},
  {path: '/gerechten_producten', component: Dish_Product},
  {path: '/drinken_nieuw', component: DrinkNew},
  {path: '/menu_maker', component: MenuMaker},
  {path: '/bestel', component: Order},
  {path: '/bestel/:sorting', component: Order},
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
