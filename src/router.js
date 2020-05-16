import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import NotFound from "./views/NotFound";
import Levels from "./views/Levels";
import NewOrResume from "./views/NewOrResume";
import Sudoku from "./views/Sudoku";

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
      component: Levels
    },
    {
      path: "/newOrResume/",
      name: "newOrResume",
      component: NewOrResume
    },
    {
      path: "/sudoku",
      name: "sudoku",
      component: Sudoku
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});
