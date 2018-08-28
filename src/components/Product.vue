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
          <div class="buttons">
            <a class="button is-primary">Buy</a>
            <a class="button">Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 2em;
}
</style>

