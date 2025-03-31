<template>
  <div class="chart-wrapper data-block glass px-1 mx-4" v-if="showSearchResults">
    <LineChart :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps(['weatherData', 'showSearchResults']);

const chartData = computed(() => ({
  labels: props.weatherData.map((item) => item.day), // X-Achse: Wochentage
  datasets: [
    {
      label: "Min. Temperatur (°C)",
      data: props.weatherData.map((item) => item.temperatureMin),
      borderColor: "rgba(30, 144, 255, 1)",
      backgroundColor: "rgba(30, 144, 255, 1)",
      borderWidth: 2,
      tension: 0.4,
      yAxisID: 'y1',
    },
    {
      label: "Max. Temperatur (°C)",
      data: props.weatherData.map((item) => item.temperatureMax),
      borderColor: "rgba(255, 69, 0, 1)",
      backgroundColor: "rgba(255, 69, 0, 1)",
      borderWidth: 2,
      tension: 0.4,
      yAxisID: 'y1',
    },
    {
      label: "Niederschlag (mm)",
      data: props.weatherData.map((item) => item.precipitation),
      borderColor: "rgba(255, 255, 255, 0.8)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderWidth: 2,
      tension: 0.4,
      yAxisID: 'y2',
      type: 'bar',
      barPercentage: 0.4,
      categoryPercentage: 0.8
    }
  ],
}));


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  autoPadding: true,
  radius: 6,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'white',
        font: {
          size: 16,
          weight: 'bolder'
        }
      }
    },
    y1: {
      beginAtZero: true,
      suggestedMax: 25,
      grid: {
        display: false,
      },
      ticks: {
        color: 'white',
        font: {
          size: 16,
          weight: 'bolder'
        }
      }
    },
    y2: {
      type: 'linear',
      display: true,
      position: 'right',
      beginAtZero: true,
      suggestedMax: 40, // Adjust based on your rainfall data
      grid: {
        display: false,
        drawOnChartArea: false, // Only want the grid lines for the left y-axis
      },
      ticks: {
        color: '#fff',
        font: {
          size: 16,
          weight: 'bolder'
        }
      },
      title: {
        display: true,
        text: 'Niederschlag (mm)',
        color: '#fff',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "white",
        font: {
          size: 16,
          weight: "bolder",
        },
      }
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  margin: 2rem 0;
}
</style>
