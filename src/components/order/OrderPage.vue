<template>
  <div>
    <div v-for="item in items" :key="item._id" class="box">
    <p class="has-text-right">Order on 12/03/18</p>
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
    <p class="has-text-right">{{ totalPrice(item.products) }}</p>
  </div>
  </div>
</template>

<script>
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
      let total = 0
      items.forEach(item => total += parseInt(item.product.price) * parseInt(item.qty))
      return total
    }
  }
}
</script>

<style scoped>
hr {
  color: #888;
}
</style>
