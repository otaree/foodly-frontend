<template>
  <div class="card">
    <div class="card-image">
     <router-link :to="'/product/'+item._id">
        <figure class="image is-4by3">
          <img :src="item.img" alt="Placeholder image">
        </figure>
      </router-link>
    </div>
    <div class="card-content">
      <p class="has-text-weight-semibold">{{ item.title }}</p>
      <p class="has-text-weight-semibold">{{ item.price }}</p>
    </div>
    <footer class="card-footer">
      <a v-if="!item.addedToCart" class="card-footer-item" @click="addToCart">Add to Cart</a>
      <a v-else class="card-footer-item" disabled>Added to Cart</a>
  </footer>
  </div>
</template>

<script>
import { findIndex } from 'underscore'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['product'],
  computed: {
    ...mapGetters('cart', ['getProducts']),
    item () {
      if (findIndex(this.getProducts, (prod) => prod.product._id === this.product._id) !== -1) {
        return {
          ...this.product,
          addedToCart: true
        }
      } else {
        return {
          ...this.product,
          addedToCart: false
        }
      }
    }
  },
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

