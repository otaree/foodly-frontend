<template>
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <p class="title has-text-primary brand-title">foodly</p>
            </router-link>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isActive  }">

                <div class="navbar-end is-capitalized has-text-weight-bold">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Category
                        </a>
                        <div  class="navbar-dropdown is-boxed">
                            <a v-for="category in categories" :key="category._id" class="navbar-item" @click="navigateTo('category', category.title, category._id)">
                                {{ category.title }}
                            </a>
                        </div>

                    </div>
                     <router-link class="navbar-item is-tab" to="/cart">
                        <span><i class="fas fa-shopping-cart"></i></span> ({{ cartItemNo }})
                    </router-link>
                    <router-link v-if="isAuth" class="navbar-item is-tab" to="/auth">
                        Login
                    </router-link>
                    <div v-else class="navbar-item has-dropdown is-hoverable">
                         <a class="navbar-link">
                           <span>
                               <i class="fas fa-user"></i>
                           </span>
                        </a>
                        <div class="navbar-dropdown is-boxed">
                            <a class="navbar-item" @click="navigateTo('orderhistory')">orders</a>
                            <a class="navbar-item" @click="logout">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Api from '../services/Api'

export default {
  data () {
    return {
      isActive: false,
      categories: []
    }
  },
  computed: {
      ...mapGetters('user', ['getToken']),
      ...mapGetters('cart', ['getTotalItem']),
      cartItemNo () {
          return this.getTotalItem
      },
      isAuth () {
          return this.getToken.trim() === ''
      }
  },
  async created () {
    try {
      this.categories = (await Api.get('/categories')).data
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
      ...mapActions('user', ['logout']),
      navigateTo (name, title='', id='') {
          if (title !== '') {
            this.$router.push({ name, params: { title }, query: { id } })
          } else {
              this.$router.push({ name })
          }
      }
  }
}
</script>

<style scoped>
.brand-title {
    font-family: 'Lobster', cursive;
}
</style>

