import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import Vuex from "vuex";
import store from "./store";

import App from "./App.vue";
import router from "./router";

Vue.use(BootstrapVue);
Vue.use(Vuex);
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
