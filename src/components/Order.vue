<template>
    <section class="section">
        <div class="container">
        <address-form v-if="editForm" @addressAdded="editForm = false" />
        <div v-else class="columns">
            <div class="column is-8">
                <div class="card">
                    <div class="card-content">
                        <h4 class="is-text-4 has-text-weight-semibold ">Your Adress</h4>
                        <p class="has-text-weight-light">Phone: {{ address.phone }}</p>
                        <p class="has-text-weight-light">Line one: {{ address.addressLine1 }}</p>
                        <p class="has-text-weight-light">Line one: {{ address.addressLine2 }}</p>
                        <p class="has-text-weight-light">City: {{ address.city }}</p>
                        <p class="has-text-weight-light">Pincode: {{ address.pincode }}</p>
                        <p class="has-text-weight-light">State: {{ address.state }}</p>
                    </div>
                    <div class="card-footer">
                        <a class="card-footer-item" @click="edit">Edit</a>
                    </div>
                </div>
            </div>
            <div class="column">
                <buy-button />
            </div> 
        </div>
    </div>

</section>
</template>

<script>
import store from '../store'
import { mapGetters } from 'vuex'
import AddressForm from './UX/AddressForm'
import BuyButton from './UX/BuyButton'


export default {
    components: {
        BuyButton,
        AddressForm
    },
    data () {
        return {
            editForm: false
        }
    },
    computed: {
        ...mapGetters('cart', ['cartTotalPrice']),
        ...mapGetters('user', ['getAddress']),
        address () {
            return this.getAddress
        }
    },
    methods: {
        edit () {
            this.editForm = true
        }
    },
    created () {
        const isAddressEmpty = Object.keys(this.getAddress).length === 0 
        this.editForm = isAddressEmpty
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

