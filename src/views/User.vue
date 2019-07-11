<template>
  <div class="home col-12 container-fluid pl-0 ml-0">
    <b-container fluid>
      <b-row>
        <b-col class="pl-0 pr-2 col-3 bg-dark h-100">
          <user-side-bar></user-side-bar>
        </b-col>
        <b-col>
          <b-container class="ml-1 pl-1" fluid>
            <b-row>
              <h5 v-if="userInfo != null">
                {{ userInfo.Username | capitalize }}'s Home Page
              </h5>
            </b-row>
            <b-row>
              <b-col>
                <router-view></router-view>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserSideBar from "../components/UserSideBar";
export default {
  name: "home",
  components: { UserSideBar },
  data() {
    return {
      userInfo: null,
      formattedDate: null
    };
  },
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
        this.formattedDate = this.userInfo.JoinDate.substr(0, 10);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped></style>
