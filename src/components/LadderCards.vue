<template>
  <div>
    <b-container fluid>
      <b-card-group deck>
        <b-card v-for="(ladder, index) in ladders" :key="index" class="shadow">
          <b-card-text>
            <p>
              {{ ladder.name }}
            </p>
            <p>Your Position: {{ ladderPosition(ladder.players) }}</p>
            <div slot="footer">
              <router-link
                :to="{ name: 'viewLadders', params: { defaultLadder: index } }"
                >View Ladder
              </router-link>
            </div>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "LadderCards",
  props: ["ladders", "user"],
  methods: {
    ladderPosition(players) {
      let player;
      for (player of players) {
        if (player.user_id === this.user.id) {
          return player.rank;
        }
      }
      return 0;
    }
  }
};
</script>

<style scoped></style>
