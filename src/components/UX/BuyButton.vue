<template>
  <div>
    <a class="button btn-buy is-primary is-large" @click="pay">Buy</a>
    <loading-page v-if="isLoading" />
  </div>
  
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

import LoadingPage from './LoadingPage'
import Api from '../../services/Api'
import logo from '../../assets/logo.png'


let data = {
  image: logo,
  isLoading: false
}

 var options = {
      "key": "rzp_test_CAenydhGA5oCzc",
      "name": "foodly",
      "description": "Purchase Description",
      "theme": {
        "color": "#8c67ef"
      }
    };
var rzp1;
export default {
   data () {
    return data
  },
  components: {
    LoadingPage
  },
  computed: {
        ...mapGetters('cart', ['cartTotalPrice']),
        ...mapGetters('user', ['getAddress', 'getEmail', 'getToken'])
    },
  created () {
    options["image"] = this.image,
    options["notes"] = {
      "address": JSON.stringify(this.getAddress) 
      }
    options["prefill"] = {
      "email": this.getEmail
     }
    options["amount"] = String(this.cartTotalPrice)
    options["handler"] = (response) => {
        this.isLoading = true
        Api.get(`/orders/purchase/${response.razorpay_payment_id}`, { headers: { 'Authorization': `bearer ${this.getToken}` } })
          .then(res => {
            this.isLoading = false
            // this.orderData = res.data.order.products
            this.clear(true)
            this.$router.push(`/order/successful/${res.data.order._id}`)
          })
          .catch(err => {
            this.isLoading = false
            console.log(err.response.data)
          })
      }

    rzp1 = new Razorpay(options);
  },
  methods: {
    ...mapActions('cart', ['clear']),
    pay (e) {
      rzp1.open()
      e.preventDefault()
    }    
  },
  beforeDestroy() {
    rzp1 = null
  }
}
</script>


<style scoped>
.btn-buy {
  width: 100%;
}
</style>
