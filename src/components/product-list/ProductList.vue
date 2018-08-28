<template>
    <div>
     <div  class="columns is-multiline">
       <div v-for="product in products" :key="product._id" class="column is-3">
          <figure class="image is-4by3">
            <router-link :to="'/product/'+product._id">
              <img :src="product.img">
            <!-- <p>{{ product.title }}</p> -->
            </router-link>
        </figure>
       </div>
     </div>
     <div class="pagination">
       <a class="is-text-primary" :class="{ 'not-active': !prev }" @click="prevPage" >
         <i class="fas fa-arrow-left"></i>
       </a>
       <a class="is-text-primary" :class="{ 'not-active': !next }" @click="nextPage">
         <i class="fas fa-arrow-right"></i>
       </a>
     </div>
    </div>
</template>

<script>
import Api from '../../services/Api'

export default {
  props: ['address'],   
  data () {
    return {
      products: [],
      page: 0,
      next: false
    }
  },
  computed: {
    prev () {
      return this.page > 0
    }
  },
  async created () {
    try {
      this.fetchProducts(0)
    } catch (error) {
      console.error(error)
    }
  },
  watch: {
    address: function () {
        this.fetchProducts(0)
    }
  },
  methods: {
   async fetchProducts (page, limit=8) {
     try {
      const response = await Api(`${this.address}?limit=${limit}&page=${page}`)
      console.log(response)
      this.products = response.data.products
      this.next = response.data.next
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
   },
   async nextPage () {
      if (!this.next) return;
      let page = this.page + 1
      try {
        await this.fetchProducts(page)
        this.page = page
      } catch (error) {
        console.error(error)
      }
    },
    async prevPage () {
      if (page <= 0) return;
      let page = this.page - 1
      try {
        await this.fetchProducts(page)
        this.page = page
      } catch (error) {
        console.error(error)
      }
    }
  } 
}
</script>

<style scoped>
.fas {
  font-size: 1.8em;
}
.pagination {
  display: flex;
  justify-content: space-around;
}
.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: rgb(226, 219, 219);
}

</style>

