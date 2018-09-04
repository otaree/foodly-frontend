<template>
  <section class="section">
    <div class="container">
      <p class="title has-text-centered">Your Orders</p>
      <order-page :orders="orders" />
      <div class="buttons is-centered my">
        <a v-if="next" class="button is-primary is-medium" @click="load">Load more</a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '../../services/Api'
import OrderPage from './OrderPage'

export default {
  components: {
    OrderPage
  },
  data () {
    return {
      orders: [],
      page: 0,
      next: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['getToken'])
  },
  methods: {
    async fetchOrders () {
      try {
        const response = await Api.get(`/orders?page=${this.page}`, { headers: { 'Authorization': `bearer ${this.getToken}` }})
        this.orders.push(...response.data.orders)
        this.page = this.page + 1
        this.next = response.data.next
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error.response.data)
      }
    },
    async load() {
      try {
        await this.fetchOrders()
      } catch (error) {
        console.log(error)
      }
    }
  },
  async created() {
    try {
      this.fetchOrders()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.my {
  margin-top: 3%;
  margin-bottom: 2%;
}
</style>
