<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="10" class="mx-auto">
          <b-form @submit.prevent="createLadder">
            <b-form-group id="input-group-1" label="Name:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="name"
                type="text"
                required
                placeholder="Enter Ladder Name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="select-method-group"
              label="Ladder Method:"
              label-for="select-method"
            >
              <b-form-select
                id="select-method"
                v-model="method"
                :options="options"
                type="email"
                required
              ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      owner: null,
      method: null,
      options: [
        { value: null, text: "Please select a Ladder Method" },
        { value: "elo", text: "Elo" },
        {
          value: "swap",
          text: "Swap - not currently implemented",
          disabled: true
        }
      ]
    };
  },
  computed: {
    user: function() {
      let userStore = this.$store.getters.user;
      return JSON.parse(userStore);
    }
  },
  methods: {
    createLadder: function() {
      let data = {
        name: this.name,
        method: this.method,
        owner: this.user.id
      };
      console.log(data);
      this.$http
        .post("/auth/ladder", data)
        .then(() => this.$router.push({ name: "user" }))
        .catch(err => console.log(err));
    }
  }
};
</script>
