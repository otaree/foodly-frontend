<template>
    <section class="hero auth is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="auth-form">
                  <auth-form :title="title" :isLogin="isLogin" @change="change" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AuthForm from './UX/AuthForm'

export default {
  components: {
    AuthForm
  },
  data () {
    return {
      title: 'Login',
      isLogin: true
    }
  },
  methods: {
    change () {
      this.title = this.title === 'Login' ? 'Sign Up' : 'Login'
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style >
.auth {
  width: 100%;
  height: 100%;
  /* background-color: #43288d; */
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
}

.auth-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-btn {
  width: 100%;
}

.brand-title {
    font-family: 'Lobster', cursive;
}
</style>
