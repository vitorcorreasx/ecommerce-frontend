import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/HomePage.vue';
import Menu from '../views/MenuPage.vue';
import Payment from '../views/PaymentPage.vue';
import CartPage from '../views/CartPage.vue';
import Login from '../views/LoginPage.vue';
import Register from '../views/RegisterPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/payment/:id', name: 'Payment', component: Payment },
  { path: '/mycart', name: 'CartPage', component: CartPage }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;