import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from './components/Products'
import Category from './components/Category'
import Product from './components/Product'
import Cart from './components/Cart'
import Order from './components/Order'
import AuthPage from './components/AuthPage'
import OrderSuccessful from './components/order/OrderSuccessful'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'products',
      component: Products
    },
    {
      path: '/category/:title',
      name: 'category',
      component: Category
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage
    },
    {
      path: '/order/successful/:id',
      name: 'ordersuccessful',
      component: OrderSuccessful
    }
  ]
})


export default router