<template>
    <section class="section">
        <div class="container">
        <address-form v-if="!formFiled" />
        <div v-else class="columns">
            <div class="column is-8">
                <div class="card">
                    <div class="card-content">
                        <h4 class="is-text-4 has-text-weight-semibold ">Your Adress</h4>
                        <p class="has-text-weight-light">Name:
                            {{ name }}</p>
                        <p class="has-text-weight-light">Email:
                            {{ email }}</p>
                        <p class="has-text-weight-light">Address:</p>
                        <p class="has-text-weight-light">{{ address }}</p>
                    </div>
                    <div class="card-footer">
                        <a class="card-footer-item" @click="edit">Edit</a>
                    </div>
                </div>
            </div>
            <div class="column">
                <buy-button
                    :name="name"
                    :address="address"
                    :email="email"
                    :total="cartTotalPrice"/>
            </div>
        </div>
    </div>

</section>
</template>

<script>
import store from '../store'
import { mapGetters } from 'vuex'
import AddressForm from './UX/AdressForm'
import BuyButton from './UX/BuyButton'


export default {
    components: {
        BuyButton,
        AddressForm
    },
    data () {
        return {
            
            formFiled: false
        }
    },
    computed: {
        ...mapGetters('cart', ['cartTotalPrice']),
        ...mapGetters('user', ['getAddress'])
    },
    methods: {
    },
     beforeRouteEnter (to, from, next) {
         if (store.state.user.token.trim() === '') {
             next({ path: '/auth'})
         } else {
            next()
         }     
    }
  
}
</script>

<style scoped>

</style>

