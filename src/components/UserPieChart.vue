<template>
  <div id="chart">
    <h6>Game Results</h6>
    <apexchart type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts/dist/vue-apexcharts";

export default {
  name: "UserPieChart",
  components: {
    apexchart: VueApexCharts
  },
  props: ["stats"],
  data() {
    return {
      series: [this.stats.Wins, this.stats.Losses, this.stats.Draws],
      chartOptions: {
        labels: ["Wins", "Losses", "Draws"]
      }
    };
  }
};
</script>

<style scoped></style>
