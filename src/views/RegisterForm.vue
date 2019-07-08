<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="10" class="mx-auto">
          <b-form @submit.prevent="register">
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="username"
                type="text"
                required
                placeholder="Enter Username"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-email"
              label="Email:"
              label-for="input-email"
            >
              <b-form-input
                id="input-email"
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

            <b-form-group
              id="input-group-3"
              label="Confirm Password:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="confirm"
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
      username: "",
      email: "",
      password: "",
      confirm: ""
    };
  },
  methods: {
    register: function() {
      let data = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm: this.confirm
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push({ name: "login" }))
        .catch(err => console.log(err));
    }
  }
};
</script>
