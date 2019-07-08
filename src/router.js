import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import User from "./views/User";
import CreateLadderForm from "./views/CreateLadderForm";

Vue.use(Router);

let router = new Router({
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
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/createladder",
      name: "createladder",
      component: CreateLadderForm,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
