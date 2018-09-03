<template>
  <div class="loading">
    <spinner />
  </div>  
</template>


<script>
import Spinner from './Spinner'

export default {
  components: {
    Spinner
  }  
}
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: #43288d;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
