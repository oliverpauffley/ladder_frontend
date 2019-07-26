<template>
  <div class="home col-12 container-fluid pl-0 ml-0 h-100">
    <b-container fluid>
      <b-row>
        <b-col class="pl-0 pr-2 col-3 bg-dark h-100">
          <user-side-bar></user-side-bar>
        </b-col>
        <b-col>
          <b-container class="ml-1 pl-1" fluid>
            <b-row>
              <h5 v-if="user != null">
                {{ user.username | capitalize }}'s Home Page
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
    return {};
  },
  methods: {},
  computed: {
    user: function() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    this.$store
      .dispatch("ladders", this.user.id)
      .catch(err => console.log(err));
  }
};
</script>

<style scoped></style>
