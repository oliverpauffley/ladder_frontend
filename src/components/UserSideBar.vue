<template>
  <div class="sidebar">
    <b-nav
      vertical
      align="center"
      justified
      class="pr-1 pl-2 text-wrap"
      id="user-side-bar"
    >
      <b-navbar-brand
        ><router-link to="/user"> Ladder App</router-link>
      </b-navbar-brand>

      <!-- user options -->
      <span>
        <b-nav-item-dropdown text="User Options" dropright="true">
          <b-dropdown-item>
            <router-link to="/user/changePassword">Change Password</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </span>

      <!-- ladder options -->
      <span>
        <b-nav-item-dropdown text="Ladder Options" dropright="true">
          <b-dropdown-item>
            <router-link to="/user/createLadder">Create Ladder</router-link>
          </b-dropdown-item>
          <b-dropdown-item>
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
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #2c3e50;
}
a {
  color: lightgray;
}
.dropdown {
  color: darkslategray;
}
</style>
