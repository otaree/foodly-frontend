<template>
  <section class="section">
    <div class="container">
      <p class="title">Your Order was successfull</p>
      <order-page :orders="orders" />
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
      orders: []
    }
  },
  computed: {
    ...mapGetters('user', ['getToken'])
  },
  async created() {
    try {
      const response = await Api.get(`/orders/${this.$route.params.id}`, { headers: { 'Authorization': `bearer ${this.getToken}` } })
      console.log(response.data)
      this.orders.push(response.data.order)
    } catch (error) {
      console.log(error.response)
    }
  }
}
</script>
