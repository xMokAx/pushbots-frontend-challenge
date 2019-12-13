<template>
  <v-app>
    <nuxt />
    <Toast />
  </v-app>
</template>

<script>
import Toast from '../components/Toast'
export default {
  components: {
    Toast
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$router.history.current.fullPath
        }
      ]
    }
  }
}
</script>
