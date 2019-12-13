<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="d-flex flex-column"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      name="email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      name="password"
      type="password"
      required
    ></v-text-field>

    <nuxt-link to="/register" class="body-2 font-weight-bold"
      >Don't have an account?</nuxt-link
    >
    <nuxt-link to="/reset-pw" class="body-2 font-weight-bold"
      >Forgot your password?</nuxt-link
    >

    <v-btn
      :disabled="!valid || !email || !password"
      type="submit"
      color="accent"
      block
      class="my-4"
    >
      LOGIN
    </v-btn>
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex'
import { SHOW_TOAST } from '../store/toast/mutation-types'
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    valid: false,
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length > 4 || 'Password must be more than 4 characters'
    ]
  }),
  computed: {
    isLoggingIn: {
      get() {
        return this.loading
      },
      set() {
        this.$emit('toggle-loading')
      }
    }
  },
  methods: {
    onSubmit() {
      this.isLoggingIn = true
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          this[SHOW_TOAST]({
            color: 'success',
            text: `Welcome back ${this.$auth.user.name}`
          })
        })
        .catch((e) => {
          this[SHOW_TOAST]({
            color: 'error',
            text: 'Email or password is wrong'
          })
          this.isLoggingIn = false
        })
    },
    ...mapMutations('toast', [SHOW_TOAST])
  }
}
</script>
