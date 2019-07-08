<template>
  <div class="home">
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col sm="2" class="side-bar-col">
          <UserSideBar></UserSideBar>
        </b-col>
        <b-col sm="8">
          <b-row cols="8" sm="6">{{ user.username }}</b-row>
          <b-row cols="4" sm="6">{{ userInfo }}</b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserSideBar from "../components/UserSideBar";
export default {
  name: "home",
  data() {
    return {
      userInfo: null
    };
  },
  components: { UserSideBar },
  methods: {},
  computed: {
    user: function() {
      let data = this.$store.getters.user;
      return JSON.parse(data);
    }
  },
  mounted() {
    this.$http
      .get("/auth/users/" + this.user.id.toString())
      .then(response => {
        this.userInfo = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.side-bar-col {
  margin-top: 0;
  margin-right: 5px;
  margin-left: 0;
  padding-left: 0;
}
.home {
  margin-left: 0;
}
</style>
