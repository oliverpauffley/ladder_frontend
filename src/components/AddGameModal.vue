<template>
  <div v-if="ladder.length && index != null">
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
</template>

<script>
export default {
  name: "AddGameModal",
  props: {
    ladder: Array,
    index: Number
  },
  data() {
    return {
      player1: null,
      player2: null,
      winner: null
    };
  },
  computed: {
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
      let list = this.ladder[1].players.slice();
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
      for (user of this.ladder[1].players) {
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
      if (player1 === this.winner) {
        winner = player1;
        loser = player2;
      } else if (player2 === this.winner) {
        winner = player2;
        loser = player1;
      } else {
        winner = player1;
        loser = player2;
        draw = true;
      }
      let user = this.$store.getters.user;
      let id = user.id;
      let data = {
        winner: winner,
        loser: loser,
        draw: draw,
        ladder_id: this.ladder[1].ladder_id
      };

      this.$http
        .post("/auth/game", data)
        .then(() =>
          // close modal
          this.$nextTick(() => {
            this.$refs.modal.hide();
          })
        )
        .then(() => this.$store.dispatch("ladders", id))
        .then(this.resetModal)
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
