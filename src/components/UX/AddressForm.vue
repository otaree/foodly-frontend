<template>
  <div>
    <p class="title has-text-centered">Add Your Mailing Address</p>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="field">
          <label class="label">Phone</label>
          <div class="field has-addons">

            <p class="control">
              <a class="button is-static">
                +91
              </a>
            </p>
            <p class="control is-expanded">
              <input class="input" v-model="phone" type="number" placeholder="Your number">

            </p>
          </div>
            <p v-if="errors.phone.error" class="help is-danger">{{ errors.phone.msg }}</p>

        </div>

        <div class="field">
          <label class="label">Address Line 1</label>
          <div class="control">
            <input v-model="addressLine1" class="input" type="text">
          </div>
            <p v-if="errors.addressLine1.error" class="help is-danger">{{ errors.addressLine1.msg }}</p>
        </div>

        <div class="field">
          <label class="label">Address Line 2</label>
          <div class="control">
            <input v-model="addressLine2" class="input" type="text">
          </div>
            <p v-if="errors.addressLine2.error" class="help is-danger">{{ errors.addressLine2.msg }}</p>

        </div>

        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input v-model="city" class="input" type="text" placeholder="Tezu">
          </div>
            <p v-if="errors.city.error" class="help is-danger">{{ errors.city.msg }}</p>

        </div>

        <div class="field">
          <label class="label">State</label>
          <div class="control">
            <input v-model="state" class="input" type="text" placeholder="Arunachal Pradesh">
          </div>
            <p v-if="errors.state.error" class="help is-danger">{{ errors.state.msg }}</p>

        </div>

        <div class="field">
          <label class="label">Pincode</label>
          <div class="control">
            <input v-model="pincode" class="input" type="number" placeholder="792001">
          </div>
            <p v-if="errors.pincode.error" class="help is-danger">{{ errors.pincode.msg }}</p>

        </div>

        <div class="buttons is-centered">
          <a class="button is-large is-primary" :class="{'is-loading': isLoading}" @click="addAddress">Add Address</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isLoading: false,
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      errors: {
        phone: {
          error: false,
          msg: ''
        },
        addressLine1: {
          error: false,
          msg: ''
        },
        addressLine2: {
          error: false,
          msg: ''
        },
        city: {
          error: false,
          msg: ''
        },
        state: {
          error: false,
          msg: ''
        },
        pincode: {
          error: false,
          msg: ''
        },
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      address: 'getAddress',
      token: 'getToken'
    }),
  },
  methods: {
    ...mapActions('user', ['setAddress']),
    checkError () {
      let error = false
      if (String(this.phone).trim().length === 0) {
        error = true
        this.errors.phone.error = true
        this.errors.phone.msg = 'please provide a valid phone number'
      } else {
        this.errors.phone.error = false
        this.errors.phone.msg = ''
      }

      if (this.addressLine1.trim().length === 0) {
        error = true
        this.errors.addressLine1.error = true
        this.errors.addressLine1.msg = 'address line one should not be empty'
      } else {
        this.errors.addressLine1.error = false
        this.errors.addressLine1.msg = ''
      }

      if (this.addressLine2.trim().length === 0) {
        error = true
        this.errors.addressLine2.error = true
        this.errors.addressLine2.msg = 'address line two should not be empty'
      } else {
        this.errors.addressLine2.error = false
        this.errors.addressLine2.msg = ''
      }

      if (this.city.trim().length === 0) {
        error = true
        this.errors.city.error = true
        this.errors.city.msg = 'please provide a city name'
      } else {
        this.errors.city.error = false
        this.errors.city.msg = ''
      }

      if (this.state.trim().length === 0) {
        error = true
        this.errors.state.error = true
        this.errors.state.msg = 'please provide a state name'
      } else {
        this.errors.state.error = false
        this.errors.state.msg = ''
      }

      if (String(this.pincode).trim().length === 0) {
        error = true
        this.errors.pincode.error = true
        this.errors.pincode.msg = 'please provide a valid pincode'
      } else {
        this.errors.pincode.error = false
        this.errors.pincode.msg = ''
      }
    },
    async addAddress () {
      if (this.checkError()) return
      try {
        this.isLoading = true
        await this.setAddress({ address: { phone: this.phone, addressLine1: this.addressLine1, addressLine2: this.addressLine2, city: this.city, state: this.state, pincode: this.pincode }, token: this.token  })
        this.isLoading = false
        this.$emit('addressAdded')
      } catch (error) {
        console.error(error)
        this.isLoading = false
      }
    }
  },
  created () {
    if (Object.keys(this.address).length > 0) {
      this.phone = this.address.phone
      this.addressLine1 = this.address.addressLine1
      this.addressLine2 = this.address.addressLine2
      this.city = this.address.city
      this.state = this.address.state
      this.pincode = this.address.pincode
    }
  }
}
</script>

<style scoped>

</style>