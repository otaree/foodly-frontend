<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6">
           <figure class="image is-4by3">
              <img :src="product.img">
        </figure>
        </div>
        <div class="column is-6">
          <h2 class="title">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <p class="has-text-weight-bold mt-1">&#8377; {{ product.price | toRupee }}</p>
          <div class="buttons">
            <a class="button" @click="addToCart">Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Api from '../services/Api'

export default {
  data () {
    return {
      product: {}
    }
  },
  async created () {
    try {
       this.product = (await Api.get(`/products/${this.$route.params.id}`)).data
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    ...mapActions('cart',['addItem']),
    addToCart() {
      this.addItem(this.product);
    }
  }
}
</script>

<style scoped>
.mt-1 {
  margin-top: 2%;
}
.buttons {
  margin-top: 2em;
}
</style>

