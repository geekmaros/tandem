import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/quiz",
    name: "QuizPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/QuizPage.vue")
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Leaderboard.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// router.beforeEach((to, from, next) => {
//   if (to.name === "QuizPage" && store.state.user.currentPlayer === null) {
//     next({ name: "QuizPage" });
//     // } else if (to.name === "QuizPage" && localStorage.getItem("trivia")) {
//     //   next({ name: "QuizPage" });
//   } else next();
// });
export default router;
