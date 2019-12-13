<template>
  <v-snackbar
    v-model="isToastShown"
    :timeout="3000"
    :color="toastOptions.color"
  >
    <v-icon v-if="toastOptions.icon" color="white" class="mr-2">{{
      toastOptions.icon
    }}</v-icon>
    <span>{{ toastOptions.text }}</span>
    <v-btn icon @click="CLOSE_TOAST"><v-icon>mdi-close-circle</v-icon></v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { CLOSE_TOAST } from '../store/toast/mutation-types'
export default {
  computed: {
    isToastShown: {
      get() {
        return this.$store.state.toast.isToastShown
      },
      set() {
        this[CLOSE_TOAST]()
      }
    },
    ...mapGetters('toast', ['toastOptions'])
  },
  methods: mapMutations('toast', [CLOSE_TOAST])
}
</script>
