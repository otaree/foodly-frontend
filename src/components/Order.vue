<template>
    <section class="section">
        <div class="container">
            <div v-if="!formFiled">
                <h2 class="title has-text-centered">Add Shipping Address</h2>
                <b-field horizontal="horizontal" label="Details">
                    <b-input name="name" v-model="name" placeholder="Name" expanded="expanded"></b-input>
                    <b-input
                        name="email"
                        type="email"
                        v-model="email"
                        placeholder="nobody@nowhere.com"
                        expanded="expanded"></b-input>
                </b-field>

                <b-field horizontal="horizontal" label="Adress">
                    <b-input v-model="address" type="textarea"></b-input>
                </b-field>

                <b-field horizontal="horizontal">
                    <!-- Label left empty for spacing -->
                    <p class="control">
                        <button class="button is-primary" @click="addAddress">
                            Add
                        </button>
                    </p>
                </b-field>
            </div>

            <div v-else class="columns">
                <div class="column is-8">
                    <div class="card">
                        <div class="card-content">
                            <h4 class="is-text-4 has-text-weight-semibold ">Your Adress</h4>
                            <p class="has-text-weight-light">Name: {{ name }}</p>
                            <p class="has-text-weight-light">Email: {{ email }}</p>
                            <p class="has-text-weight-light">Address:</p>
                            <p class="has-text-weight-light">{{ address }}</p>
                        </div>
                        <div class="card-footer">
                            <a class="card-footer-item" @click="edit">Edit</a>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <buy-button :name="name" :address="address" :email="email" :total="cartTotalPrice" />
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import store from '../store'
import { mapGetters } from 'vuex'
import BuyButton from './UX/BuyButton'

export default {
    components: {
        BuyButton
    },
    data () {
        return {
            name: '',
            email: '',
            address: '',
            formFiled: false
        }
    },
    computed: {
        ...mapGetters('cart', ['cartTotalPrice']),
    },
    methods: {
        addAddress () {
            if (this.name.trim() === '' || this.email.trim() === '' || this.address.trim() === '') return;
            this.formFiled = true;
        },
        edit () {
            this.formFiled = false
        }
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

