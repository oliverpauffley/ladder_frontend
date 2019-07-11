<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="10" class="mx-auto">
          <b-form @submit.prevent="login">
            <b-form-group id="input-group-1" label="Email:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Enter Email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="password"
                type="password"
                required
              ></b-form-input>
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
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/user"))
        .catch(err => console.log(err));
    }
  }
};
</script>
