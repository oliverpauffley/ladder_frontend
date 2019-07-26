<template>
  <div>
    <b-navbar toggleable="lg" id="nav">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLoggedIn"
            ><router-link to="/login">Login</router-link></b-nav-item
          >
          <b-nav-item v-if="!isLoggedIn"
            ><router-link to="/register">Register</router-link></b-nav-item
          >
          <b-nav-item v-if="isLoggedIn"
            ><a @click="logout">Logout</a></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
#nav {
  background-color: darkslategray;
  padding: 15px;
  color: ghostwhite;
}
a {
  color: ghostwhite;
}
</style>
