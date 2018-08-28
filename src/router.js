import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from './components/Products'
import Category from './components/Category'
import Product from './components/Product'
import Cart from './components/Cart'

Vue.use(VueRouter)

export default new VueRouter({
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
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})