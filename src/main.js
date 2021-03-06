import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'animate.css/animate.min.css'
import './filters'


import router from './router'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
