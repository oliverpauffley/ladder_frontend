<template>
  <div>
    <b-navbar toggleable="lg" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id="nav">
          <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
          <b-nav-item
            ><router-link to="/register">Register</router-link></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style>
#nav {
  padding: 15px;
  color: ghostwhite;
}

#nav a {
  font-weight: bold;
  color: aliceblue;
}
</style>
