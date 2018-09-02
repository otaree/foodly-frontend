<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="clolumns">
                        <div class="column is-10">
                            <div v-for="item in items" :key="item.product._id" class="product">
                                <figure class="image is-128x128" >
                                    <img :src="item.product.img">
                                </figure>
                                <div class="product-desciption" style="flex-grow: 8;">
                                    <h3 class="is-size-5 has-text-black-bis is-capitalized has-text-weight-semibold">{{ item.product.title }}</h3>
                                    <div class="buttons">
                                        <a class="button is-danger is-small" @click="removeProduct(item.product._id)">Remove</a>
                                    </div>
                                </div>
                                <p>{{ item.product.price }}</p>
                            </div>
                            <div class="buttons is-centered">
                                <a class="button is-danger is-large">Clear Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card">
                        <div class="card-content">
                            <div class="total-price">
                                <p class="is-size-5">Total</p>
                                <p>{{ cartTotalPrice }}</p>
                            </div>
                        </div>
                        <div class="card-footer">
                             <a class="card-footer-item button is-primary" @click="$router.push('/order')">Place Order</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['getProducts', 'cartTotalPrice']),
    items () {
        return this.getProducts
    }
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
.product {
    display: flex;
    /* flex-direction: row; */
    flex-wrap: wrap;
    justify-content: unset;
    align-items: flex-start;
}

.product-desciption {
    padding-left: 1em;
}

.total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>