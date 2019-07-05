import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm
    },
    {
      path: "/register",
      name: "register",
      component: RegisterForm
    }
  ]
});
