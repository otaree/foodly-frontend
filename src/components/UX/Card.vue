<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.img" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <p class="has-text-weight-semibold">{{ product.title }}</p>
      <p class="has-text-weight-semibold">{{ product.price }}</p>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="addToCart">Add to Cart</a>
  </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['product'],
  methods: {
    ...mapActions('cart',['addItem']),
    addToCart () {
      this.addItem(this.product)
    }
  }
  
}
</script>

<style scoped>

</style>

