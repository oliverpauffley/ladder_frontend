<template>
  <div>
    <b-nav vertical align="center" justified id="user-side-bar">
      <h6 id="nav-title">User Options</h6>
      __________
      <b-nav-item
        ><router-link to="/createLadder">Create Ladder</router-link></b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "UserSideBar.vue"
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
#nav-title {
  color: ghostwhite;
}
</style>
