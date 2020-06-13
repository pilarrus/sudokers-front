import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import NotFound from "./views/NotFound";
import Levels from "./views/Levels";
import NewOrResume from "./views/NewOrResume";
import Sudoku from "./views/Sudoku";
import store from "./store";

Vue.use(Router);

const isAuthenticated = () => Object.keys(store.state.user).length !== 0;

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
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/levels",
      name: "levels",
      component: Levels,
      beforeEnter: (to, from, next) => {
        if (to.name !== "login" && !isAuthenticated()) next({ name: "login" });
        else next();
      }
    },
    {
      path: "/newOrResume/",
      name: "newOrResume",
      component: NewOrResume,
      beforeEnter: (to, from, next) => {
        if (to.name !== "levels" && !isAuthenticated()) next({ name: "login" });
        else next();
      }
    },
    {
      path: "/sudoku",
      name: "sudoku",
      component: Sudoku,
      beforeEnter: (to, from, next) => {
        if (to.name !== "newOrResume" && !isAuthenticated())
          next({ name: "login" });
        else next();
      }
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});
