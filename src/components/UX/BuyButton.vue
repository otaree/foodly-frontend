<template>
  <div>
    <a class="button btn-buy is-primary is-large" @click="pay">Buy</a>
     <b-modal :active.sync="isImageModalActive" width="70%" @close="close">
            <div class="box">
              <div class="content">
                <h3 class="has-text-centered is-text-3">SUCCESS</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cumque sit assumenda reiciendis ut consequuntur ab labore autem velit, praesentium molestias voluptas eum fugit saepe rem repellat. Qui, eum. Quia?</p>
              </div>
            </div>
      </b-modal>
  </div>
  
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'

import Api from '../../services/Api'


let data = {
  isImageModalActive: false
}

 var options = {
      "key": "rzp_test_CAenydhGA5oCzc",
      "name": "foodly",
      "description": "Purchase Description",
      "image": "/assets/logo.png",
      "handler": function (response) {
        Api.get(`/orders/purchase/${response.razorpay_payment_id}`)
          .then(res => {
            data.isImageModalActive = true
            Vue.store.dispatch('cat/clear')
          })
          .catch(err => {
            console.log(err)
            data.isImageModalActive = false
          })
      },
      "theme": {
        "color": "#8c67ef"
      }
    };
var rzp1;
export default {
  props: ['name', 'email', 'address', 'total'],
  created () {
    options["notes"] = {
      "address": this.address 
    }
    options["prefill"] = {
      "name": this.name,
      "email": this.email
    }
    options["amount"] = String(this.cartTotalPrice)
    rzp1 = new Razorpay(options);

  },
  data () {
    return data
  },
  computed: {
        ...mapGetters('cart', ['cartTotalPrice'])
    },
  methods: {

    pay (e) {
      rzp1.open()
      e.preventDefault()
    },
    close () {
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
.btn-buy {
  width: 100%;
}
</style>
