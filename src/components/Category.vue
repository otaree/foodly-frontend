<template>
  <section class="section">
    <div class="container">
      <p class="title has-text-centered has-text-primary">{{ $route.params.title }}</p>
      <product-list :address="'/categories/'+id" />
    </div>
  </section>
</template>

<script>
import ProductList from './product-list/ProductList.vue'

export default {
  components: {
    ProductList
  },
  data () {
    return {
      id: this.$route.query.id
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.query.id
    next()
  }
}
</script>

<style scoped>

</style>

