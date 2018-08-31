<template>
    <div class="box has-white-background">
        <div v-show="notification" class="notification is-primary">
            Registration Successful
        </div>
        <p class="title brand has-text-primary has-text-centered brand-title">foodly</p>
        <p class="subtitle has-text-grey-dark has-text-centered">{{ title }}</p>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" v-model="email" type="email" placeholder="Email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
                <p v-if="error.email.isError" class="help is-danger">{{ error.email.msg }}</p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" v-model="password" placeholder="Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p v-if="error.password.isError" class="help is-danger">{{ error.password.msg }}</p>
                </div>
                <div class="field">
                    <p class="control">
                        <button v-if="isLogin" class="button auth-btn is-primary" @click="authLogin">
                            {{ authBtnText }}
                        </button>
                        <button v-else class="button auth-btn is-primary" @click="authSignUp">
                            {{ authBtnText }}
                        </button>
                    </p>
                </div>
                <p v-if="isLogin">Not registered?
                    <a @click="$emit('change')">Create an account</a>
                </p>
                <p v-else>Already a user?
                    <a @click="$emit('change')">Login</a>
                </p>
            </div>
        </template>

<script>
import { mapActions } from 'vuex'
import validator from 'email-validator';

export default {
  props: ['title', 'isLogin'],
  computed: {
    authBtnText () {
      return this.isLogin ? 'Login' : 'Sign Up'
    }
  },
  data () {
    return {
      email: '',
      password: '',
      notification: false,
      error: {
        email: {
          isError: false,
          msg: ''
        },
        password: {
          isError: false,
          msg: ''
        }
      }
    }
    
  },
  methods: {
    ...mapActions('user', ['signUp', 'login']),
    checkError () {
      let error = false
      if (!validator.validate(this.email)) {
        error = true
        this.error.email.isError = true
        this.error.email.msg = 'Invalid email'
      } else {
        this.error.email.isError = false
        this.error.email.msg = ''
      }

      if (this.password.trim() === '' || this.password.trim().length < 6) {
        error = true
        this.error.password.isError = true
        this.error.password.msg = 'password should be atleast 6 character long'
      } else {
        this.error.password.isError = false
        this.error.password.msg = ''
      }
      return error
    },
    setError (error) {
      if (error.field === 'email') {
        this.error.email.isError = true
        this.error.email.msg = error.message
      }

      if (error.field === 'password') {
        this.error.password.isError = true
        this.error.password.msg = error.message
      }
    },
    async authSignUp () {
      if (this.checkError()) return
      try {
       await this.signUp({ email: this.email, password: this.password })
       this.notification = true
       setTimeout(() =>this.notification = false, 1500)
      } catch (error) {
        this.setError(error.error)
      }
    },
    async authLogin() {
      if (this.checkError()) return
      try {
        await this.login({ email: this.email, password: this.password })
        this.$router.go(-1)
      } catch (error) {
        this.setError(error.error)
      }
    }
  },
  

}
</script>

<style scoped>

</style>