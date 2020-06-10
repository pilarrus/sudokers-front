import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faEllipsisV,
  faEraser,
  faInfoCircle,
  faPencilAlt,
  faQuestion,
  faRedo,
  faThumbtack,
  faUndo,
  faUserTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCheck,
  faEllipsisV,
  faEraser,
  faInfoCircle,
  faPencilAlt,
  faQuestion,
  faRedo,
  faThumbtack,
  faUndo,
  faUserTimes
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
