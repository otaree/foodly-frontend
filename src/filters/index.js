import Vue from 'vue'

Vue.filter('toRupee', value => {
  const rupees = Number(value) / 100
  return rupees.toFixed(2)
})