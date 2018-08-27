<template>
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img
                    src="https://bulma.io/images/bulma-logo.png"
                    alt="Bulma: a modern CSS framework based on Flexbox"
                    width="112"
                    height="28"></a>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isActive  }">
                <div v-for="category in categories" :key="category._id" class="navbar-end is-capitalized has-text-weight-bold ">
                    <a class="navbar-item is-tab">
                        {{ category.title }}
                    </a>
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
  }
}
</script>
