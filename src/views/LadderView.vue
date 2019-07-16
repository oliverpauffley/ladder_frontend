<template>
  <div v-if="!this.ladders.length">
    <h2>Loading...</h2>
  </div>
  <div v-else>
    <b-container>
      <b-row>
        <b-col class="col-4">
          <b-form-select
            v-model="index"
            :options="options"
            size="sm"
            class="m-0"
          ></b-form-select>
        </b-col>
        <b-col>
          Invite Code: <b>{{ ladders[index].hash_id }}</b>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <AddGameModal :ladder="ladders" :index="index"></AddGameModal>
      </b-row>
      <b-row>
        <b-col>
          <br />
          <Ladder :ladder="ladders" :index="index"></Ladder>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Ladder from "../components/ladder";
import AddGameModal from "../components/AddGameModal";
// TODO load fetch data for this view and remove from router link
export default {
  name: "LadderView",
  data() {
    return {
      index: 0
    };
  },
  components: { AddGameModal, Ladder },
  computed: {
    ladders: function() {
      return this.$store.getters.ladders;
    },
    options: function() {
      let options = [];
      let index = 0;
      let ladder;
      let optionLine;
      for (ladder of this.ladders) {
        optionLine = { value: index, text: ladder.name };
        options.push(optionLine);
        index++;
      }
      return options;
    }
  }
};
</script>

<style scoped></style>
