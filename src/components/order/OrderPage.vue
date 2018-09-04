<template>
  <div>
    <div v-for="item in items" :key="item._id" class="box">
    <p class="has-text-right">Order on {{ createdDate(item.created) }}</p>
    <div class="columns is-multiline is-mobile">
      <div class="column is-8">
        <p>Products</p>
      </div>
      <div class="column is-2">
        <p class="has-text-right">Price</p>
      </div>
      <div class="column is-2">
        <p class="has-text-right">Total</p>
      </div>
      <single-order :products="item.products" />
      
    </div>
    <hr />
    <p class="has-text-right">{{ totalPrice(item.products) | toRupee }}</p>
  </div>
  </div>
</template>

<script>
import moment from 'moment'
import SingleOrder from './SingleOrder.vue'


export default {
  props: ['orders'],
  components: {
    SingleOrder
  },
  computed: {
    items () {
      return this.orders
    }
  },
  methods: {
    totalPrice(items) {
      if (!items || items.length === 0) return 0
      let total = 0
      items.forEach(item => total += parseInt(item.product.price) * parseInt(item.qty))
      return total
    },
    createdDate (date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  },
  created() {
    console.log("ORDERPAGE:::",this.orders)
  }
}
</script>

<style scoped>
hr {
  background: #aaa;
}
</style>
