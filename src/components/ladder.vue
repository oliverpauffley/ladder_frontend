<template>
  <div>
    <b-table striped hover :items="list" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "ladder",
  props: ["ladder", "index"],
  data() {
    return {
      fields: ["rank", "name", "points"]
    };
  },
  computed: {
    list: function() {
      if (!this.ladder.length) {
        return [];
      } else {
        return this.orderRank(this.ladder[this.index].players);
      }
    }
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
