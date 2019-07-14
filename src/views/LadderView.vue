<template>
  <div v-if="this.ladders.length">
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
        <div>
          <b-button v-b-modal.add-game-modal>Add Game</b-button>

          <b-modal
            id="add-game-modal"
            title="Add Game"
            ref="modal"
            @show="resetModal"
            @cancel="resetModal"
            @hidden="resetModal"
            @ok="handleSubmit"
          >
            <b-container fluid>
              <b-row>
                <p class="my-4">Select Players</p>
              </b-row>
              <form ref="addGameForm" @submit.stop.prevent="handleSubmit">
                <b-row>
                  <b-col>
                    <b-form-select
                      v-model="player1"
                      :options="playersList1"
                    ></b-form-select>
                  </b-col>

                  <b-col>
                    <b-form-select
                      v-model="player2"
                      :options="playersList2"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <div v-if="player1 != null && player2 != null">
                  <b-row>
                    <p class="my-4">Enter Result</p>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-select
                        v-model="winner"
                        :options="winOptions"
                      ></b-form-select>
                    </b-col>
                  </b-row>
                </div>
              </form>
            </b-container>
          </b-modal>
        </div>
      </b-row>
      <b-row>
        <b-col>
          <br />
          <Ladder :ladders="ladders[index]"></Ladder>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Ladder from "../components/ladder";
// TODO Move add ladder modal to its own component
// TODO load fetch data for this view and remove from router link
export default {
  name: "LadderView",
  data() {
    return {
      index: 0,
      player1: null,
      player2: null,
      winner: null
    };
  },
  components: { Ladder },
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
    },
    playersList1: function() {
      return this.selectionList(this.player2).slice();
    },
    playersList2: function() {
      return this.selectionList(this.player1).slice();
    },
    winOptions: function() {
      let list = [];
      list.push({
        value: this.player1,
        text: this.nameFromId(this.player1) + " won"
      });
      list.push({
        value: this.player2,
        text: this.nameFromId(this.player2) + " won"
      });
      list.push({ value: 0, text: "Draw" });
      return list;
    }
  },
  methods: {
    selectionList: function(removeItem) {
      let list = this.ladders[this.index].players.slice();
      // if I have selected an option in the other selection then remove it
      let tmp = [];
      let user;
      for (user of list) {
        if (user.user_id !== removeItem) {
          tmp.push(user);
        }
      }
      // turn list into list of options for selection boxes
      let options = [];
      let player;
      let optionLine;
      for (player of tmp) {
        optionLine = { value: player.user_id, text: player.name };
        options.push(optionLine);
      }
      return options;
    },
    nameFromId(id) {
      let user;
      for (user of this.ladders[this.index].players) {
        if (user.user_id === id) {
          return user.name;
        }
      }
      return "No user found";
    },
    handleSubmit(bvModalEvt) {
      // Stop closing modal before submit
      bvModalEvt.preventDefault();
      // TODO input validation here

      //send json form to server
      this.submitGame();
    },
    submitGame() {
      let player1 = this.player1;
      let player2 = this.player2;
      let winner, loser;
      let draw = false;
      // find out which player won and lost
      if (player1 == this.winner) {
        winner = player1;
        loser = player2;
      } else if (player2 == this.winner) {
        winner = player2;
        loser = player1;
      } else {
        winner = player1;
        loser = player2;
        draw = true;
      }
      let data = {
        winner: winner,
        loser: loser,
        draw: draw,
        ladder_id: this.ladders[this.index].ladder_id
      };
      console.log(data);
      this.$http
        .post("/auth/game", data)
        .then(() =>
          // close modal
          this.$nextTick(() => {
            this.$refs.modal.hide();
          })
        )
        .catch(err => console.log(err));
    },
    resetModal() {
      this.player1 = null;
      this.player2 = null;
      this.winner = null;
    }
  }
};
</script>

<style scoped></style>
