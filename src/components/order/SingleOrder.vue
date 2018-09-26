<template>
  <div class="column">
    <div v-for="item in products" :key="item._id" class="columns product">
      <div class="column is-8">
        <div class="product-desciption">
          <figure class="image is-16x16px">
            <img :src="item.product.img">
          </figure>
          <div>
            <p class="has-text-bold">{{ item.product.title }}</p>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <p class="has-text-right">{{ item.product.price | toRupee }}</p>
        <p class="has-text-right">x{{ item.qty }}</p>
      </div>
      <div class="column is-2">
        <p class="has-text-right">{{ (item.product.price * item.qty) | toRupee }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products']
}
</script>

<style scoped>
.product {
  margin-bottom: 3%;
}
.product-desciption {
  display: flex;
}
.image {
  width: 20%;
  height: 10%;
  margin-right: 2%;
}
</style>