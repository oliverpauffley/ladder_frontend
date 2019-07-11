<template>
  <div>
    <b-table
      striped
      hover
      :items="orderRank(ladders.players)"
      :fields="fields"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: "ladder",
  props: ["ladders"],
  data() {
    return {
      fields: ["rank", "name", "points"]
    };
  },
  methods: {
    orderRank: function(arr) {
      return arr.slice().sort(function(a, b) {
        return a.rank - b.rank;
      });
    }
  }
};
</script>

<style scoped></style>
