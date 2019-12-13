<template>
  <v-overlay :value="isLoading" light color="rgba(255, 255, 255, 0.7)">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
