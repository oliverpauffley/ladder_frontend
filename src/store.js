import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt_decode from "jwt-decode";
Vue.use(Vuex);

axios.defaults.baseURL = "http://127.0.0.1:8000";

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    register_request(state) {
      state.status = "loading";
    },
    register_success(state) {
      state.status = "success";
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    update_user(state, user) {
      state.status = "user updated";
      state.user = user;
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: "/login", data: user, method: "POST" })
          .then(resp => {
            const token = resp.data;
            let decoded = jwt_decode(token);
            let obj = {};
            obj.id = decoded.ID;
            obj.username = decoded.username;
            const user = JSON.stringify(obj);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            commit("update_user", user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("register_request");
        axios({
          url: "/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(user);
            commit("register_success");
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
});
