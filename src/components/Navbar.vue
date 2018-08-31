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
                            <a v-for="category in categories" :key="category._id" class="navbar-item" @click="navigateTo(category.title, category._id)">
                                {{ category.title }}
                            </a>
                        </div>

                    </div>
                     <router-link class="navbar-item is-tab" to="/cart">
                        Cart
                    </router-link>
                    <router-link v-show="isAuth" class="navbar-item is-tab" to="/auth">
                        Login
                    </router-link>
                </div>
            </div>
        </nav>
    </template>

<script>
import { mapGetters } from 'vuex'
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
      navigateTo (title, id) {
          this.$router.push({ name: 'category', params: { title }, query: { id } })
      }
  }
}
</script>

<style scoped>
.brand-title {
    font-family: 'Lobster', cursive;
}
</style>

