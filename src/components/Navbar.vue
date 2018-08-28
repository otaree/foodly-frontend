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

                <div v-for="category in categories" :key="category._id" class="navbar-start is-capitalized has-text-weight-bold ">
                    <a class="navbar-item is-tab" @click="navigateTo(category.title, category._id)">
                        {{ category.title }}
                    </a>
                </div>
                <div class="navbar-end is-capitalized has-text-weight-bold">
                    <router-link class="navbar-item is-tab" to="/cart">
                        Cart
                    </router-link>
                </div>
            </div>
        </nav>
    </template>

<script>
import Api from '../services/Api'
import axios from 'axios'

export default {
  data () {
    return {
      isActive: false,
      categories: []
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

