<template>
  <div>
    <b-table striped hover :items="ladders.players" :fields="fields"></b-table>
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
  }
};
</script>

<style scoped></style>
