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
        <v-btn
          v-for="{ icon, label } in topButtons"
          :key="icon"
          :aria-label="label"
          text
          icon
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </div>
    </div>
    <Chart :labels="chartLabels" :data="chartValues" class="chart" />

    <v-btn
      v-for="{ icon, label } in bottomButtons"
      :key="icon"
      :aria-label="label"
      text
      icon
    >
      <v-icon>{{ icon }}</v-icon>
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
    topButtons: [
      {
        icon: 'mdi-decagram',
        label: 'star app'
      },
      {
        icon: 'mdi-share',
        label: 'share app'
      },
      {
        icon: 'mdi-dots-vertical',
        label: 'more options'
      }
    ],
    bottomButtons: [
      {
        icon: 'mdi-send',
        label: 'send notification'
      },
      {
        icon: 'mdi-update',
        label: 'update app'
      },
      {
        icon: 'mdi-cellphone-iphone',
        label: 'mobile devices'
      },
      {
        icon: 'mdi-account-group',
        label: 'all devices'
      },
      {
        icon: 'mdi-settings',
        label: 'app settings'
      },
      {
        icon: 'mdi-chart-areaspline-variant',
        label: 'app statistics'
      },
      {
        icon: 'mdi-twitter',
        label: 'tweet'
      }
    ]
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
