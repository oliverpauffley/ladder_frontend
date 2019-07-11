<template>
  <div>
    <b-container class="container-fluid">
      <b-row>
        <b-col>
          <b-form @submit.prevent="joinLadder">
            <b-form-group
              id="input-group-1"
              label="Invite Code"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="hashid"
                type="text"
                required
                placeholder="Enter Code:"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Join</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "JoinLadderForm.vue",
  data() {
    return {
      hashid: null
    };
  },
  computed: {
    user: function() {
      let userStore = this.$store.getters.user;
      return JSON.parse(userStore);
    }
  },
  methods: {
    joinLadder: function() {
      let data = {
        hashid: this.hashid,
        id: this.user.id
      };
      console.log(data);
      this.$http
        .post("/auth/ladder/join", data)
        .then(() => this.$router.push("/user"))
        .catch(err => console.log(err));
    }
  }
};
</script>
