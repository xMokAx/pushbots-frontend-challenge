<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartdata: {
        labels: this.labels,
        dataLabels: {
          display: false
        },
        datasets: [
          {
            label: 'Daily active users',
            backgroundColor: '#009688',
            borderColor: '#00796b',
            data: this.data
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 120,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    }
  },

  mounted() {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
