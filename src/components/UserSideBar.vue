<template>
  <div>
    <b-nav
      vertical
      align="center"
      justified
      class="pr-1 pl-2 user-side-bar text-wrap"
    >
      <b-navbar-brand
        ><router-link to="/user"> Ladder App</router-link>
      </b-navbar-brand>
      __________
      <span
        ><b-nav-item-dropdown text="Ladder Options" dropright="true">
          <b-dropdown-item href="#">
            <router-link to="/user/createLadder">Create Ladder</router-link>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <router-link to="/user/joinLadder">Join Ladder</router-link>
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="getLadders">
            View ladders
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </span>

      <span>
        <b-nav-item @click="logout">
          Logout
        </b-nav-item>
      </span>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "UserSideBar.vue",
  computed: {
    user: function() {
      return this.$store.getters.user;
    }
  },
  methods: {
    getLadders: function() {
      let id = this.user.id;
      this.$store
        .dispatch("ladders", id)
        .then(() => this.$router.push("/user/viewLadders"))
        .catch(err => console.log(err));
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
#user-side-bar {
  background-color: darkslategray;
  color: ghostwhite;
}
a {
  color: lightgray;
}
.dropdown {
  color: darkslategray;
}
</style>
