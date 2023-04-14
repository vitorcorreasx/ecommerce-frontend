import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Payment from '../views/Payment.vue'
import CartPage from '../views/CartPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/payment/:id', name: 'Payment', component: Payment },
  { path: '/mycart', name: 'CartPage', component: CartPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router;