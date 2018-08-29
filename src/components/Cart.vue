<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <div v-for="product in getProducts" :key="product._id" class="box has-background-light">
                        <div class="cart">
                            <figure class="image is-128x128">
                                <img :src="product.img"></figure>
                                <div class="cart-content">
                                    <p class="title">{{ product.title }}</p>
                                    <p class="has-text-weight-semibold">{{ product.price }}</p>
                                    <div class="buttons">
                                        <a class="button is-primary">Buy</a>
                                        <a class="button is-danger" @click="removeProduct(product._id)">Remove</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buy-button">
                  <a class="button is-primary">Buy All</a>
                </div>
            </div>
        </section>
    </template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['getProducts', 'cartTotalPrice'])
  },
  methods: {
    ...mapActions('cart',['removeItem']),
    removeProduct(id) {
      this.removeItem(id)
    }
  }
}
</script>


<style scoped>
.cart {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.cart-content {
  margin-left: 2em;
}

.buy-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>