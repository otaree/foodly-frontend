import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'


import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
