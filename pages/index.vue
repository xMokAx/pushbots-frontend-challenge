<template>
  <main
    class="d-flex flex-grow-1 flex-column-reverse flex-md-row justify-center"
  >
    <Logo class="logo" />

    <section class="primary flex-grow-1 flex-shrink-0 width-md-half">
      <v-card
        elevation="0"
        height="100%"
        min-height="480"
        color="primary"
        class="white--text d-flex justify-center align-center"
      >
        <h2 class="font-weight-regular title">Testimonials</h2>
      </v-card>
    </section>

    <section
      class="white flex-grow-1 flex-shrink-0 width-md-half d-flex flex-column justify-center align-center form-wrapper px-7 py-md-4 px-md-6 elevation-4"
    >
      <v-card elevation="0" width="100%" max-width="500">
        <h2 class="font-weight-regular headline mb-4">Log into your account</h2>
        <LoginForm
          :loading="isLoading"
          @toggle-loading="isLoading = !isLoading"
        />
        <div class="d-flex">
          <v-btn tile class="google-btn mr-2 white--text flex-grow-1">
            Google
          </v-btn>
          <v-btn tile class="github-btn white--text flex-grow-1">
            Github
          </v-btn>
        </div>
      </v-card>
    </section>

    <Loader :is-loading="isLoading" />
  </main>
</template>

<script>
import Logo from '../components/Logo'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'
export default {
  auth: 'guest',
  head: {
    title: 'Login'
  },
  components: {
    Logo,
    Loader,
    LoginForm
  },
  data: () => ({
    isLoading: false
  })
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
<style scoped>
.google-btn {
  background-color: #dd4b39 !important;
}
.github-btn {
  background-color: #2a2a2a !important;
}
@media screen and (min-width: 961px) {
  .width-md-half {
    flex-basis: 50%;
  }
}
@media screen and (max-width: 960px) {
  .logo {
    fill: #00796b;
  }
  .form-wrapper {
    padding-top: 74px;
    padding-bottom: 74px;
  }
}
.logo {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 50;
}
</style>
