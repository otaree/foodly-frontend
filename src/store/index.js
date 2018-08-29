import Vue from 'vue'
import Vuex from 'vuex'

import cart from './cart'
import order from './order'

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    cart,
    order
  }
})