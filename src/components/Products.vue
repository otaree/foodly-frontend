<template>
  <section class="section">
    <div class="container">
      <product-list address="/products" />
    </div>
  </section>
</template>

<script>
import ProductList from './product-list/ProductList.vue'

export default {
  components: {
    ProductList
  }
}
</script>

<style scoped>

</style>

