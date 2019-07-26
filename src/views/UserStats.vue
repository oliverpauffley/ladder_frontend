<template>
  <div v-if="userInfo != null">
    <b-container fluid class="align-content-center">
      <b-row>
        <p>You have been a member since {{ formattedDate }}</p>
      </b-row>
      <b-row class="shadow">
        <UserPieChart :stats="userInfo"></UserPieChart>
      </b-row>
      <b-row v-if="ladders.length" class="mt-3">
        <LadderCards :ladders="ladders" :user="user"></LadderCards>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserPieChart from "../components/UserPieChart";
import LadderCards from "../components/LadderCards";
export default {
  name: "UserStats",
  components: { LadderCards, UserPieChart },
  data() {
    return {
      formattedDate: null,
      userInfo: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    ladders() {
      return this.$store.getters.ladders;
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
