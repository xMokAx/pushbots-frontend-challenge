<template>
  <v-card class="pa-2 pa-sm-4">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <v-avatar tile size="64" class="d-none d-sm-block">
          <img :src="app.icon" :alt="app.title" />
        </v-avatar>
        <div>
          <v-card-title class="pt-0 pl-2">{{ app.title }}</v-card-title>
          <v-card-subtitle class="pl-2">
            <v-icon small>mdi-cellphone-iphone</v-icon>
            <span class="mr-2">{{ app.totalUsers }} users</span>
            <v-icon v-for="platform in platforms" :key="platform" small>
              {{ platform }}
            </v-icon>
          </v-card-subtitle>
        </div>
      </div>
      <div class="d-flex pt-2">
        <v-btn text icon>
          <v-icon>mdi-decagram</v-icon>
        </v-btn>
        <v-btn text icon>
          <v-icon>mdi-share</v-icon>
        </v-btn>
        <v-btn text icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
    </div>
    <!-- <v-sparkline
      :show-labels="false"
      :labels="chartLabels"
      :value="chartValues"
      :gradient="gradient"
      label-size="5"
      color="accent"
      fill
      smooth
    ></v-sparkline>
    <p class="text-center">
      <v-avatar size="16" tile color="primary"></v-avatar>
      Daily active users
    </p> -->
    <Chart :labels="chartLabels" :data="chartValues" class="chart" />

    <v-btn text icon>
      <v-icon>mdi-send</v-icon>
    </v-btn>
    <v-btn text icon>
      <v-icon>mdi-update</v-icon>
    </v-btn>
    <v-btn text icon>
      <v-icon>mdi-cellphone-iphone</v-icon>
    </v-btn>
    <v-btn text icon>
      <v-icon>mdi-account-group</v-icon>
    </v-btn>
    <v-btn text icon>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-btn text icon>
      <v-icon>mdi-chart-areaspline-variant</v-icon>
    </v-btn>
    <v-btn text icon>
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import Chart from './Chart'
export default {
  components: {
    Chart
  },
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    gradient: ['#009688', '#009688']
  }),
  computed: {
    chartLabels() {
      return this.app.chartData.map((d) => d.label)
    },
    chartValues() {
      return this.app.chartData.map((d) => d.value)
    },
    platforms() {
      return Object.entries(this.app.platforms)
        .map(([p, c]) => {
          if (c) {
            let icon
            switch (p) {
              case 'ios':
                icon = 'apple'
                break
              case 'chrome':
                icon = 'google-chrome'
                break
              case 'safari':
                icon = 'apple-safari'
                break
              default:
                icon = p
            }
            return `mdi-${icon}`
          } else {
            return false
          }
        })
        .filter((icon) => !!icon)
    }
  }
}
</script>

<style scoped>
.legend {
  border: 1px solid white;
}
.chart {
  max-height: 120px;
}
</style>
