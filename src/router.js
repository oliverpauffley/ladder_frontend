import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import User from "./views/User";
import CreateLadderForm from "./forms/CreateLadderForm";
import JoinLadderForm from "./forms/JoinLadderForm";
import LadderView from "./views/LadderView";
import UserStats from "./views/UserStats";

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
      component: User,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "userStats",
          component: UserStats,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "createLadder",
          name: "createLadder",
          component: CreateLadderForm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "joinLadder",
          name: "joinLadder",
          component: JoinLadderForm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "viewLadders",
          name: "viewLadders",
          component: LadderView,
          props: true,
          meta: {
            requiresAuth: true
          }
        }
      ]
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
