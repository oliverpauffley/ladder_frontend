<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="10" class="mx-auto">
          <b-form @submit.prevent="changePassword">
            <b-form-group
              id="input-group-1"
              label="Enter Current Password:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="current"
                type="password"
                required
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="New Password:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="newPassword"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Confirm New Password"
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
      current: "",
      newPassword: "",
      confirm: ""
    };
  },
  methods: {
    changePassword: function() {
      let data = {
        current: this.current,
        newPassword: this.newPassword,
        confirm: this.confirm
      };
      this.$http
        .post("auth/password", { data })
        .then(() => this.$router.push("/user"))
        .catch(err => console.log(err));
    }
  }
};
</script>
