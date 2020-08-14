import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const BASE_URL_TITLE = "© CiudadBusca";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { title: `Home ${BASE_URL_TITLE}`, requiresAuth: true }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: { title: `About ${BASE_URL_TITLE}` }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { title: `Login ${BASE_URL_TITLE}` }
  },
  {
    path: "/logup",
    name: "Logup",
    component: () => import("../views/Logup.vue"),
    meta: { title: `Logup ${BASE_URL_TITLE}` }
  },
  /* ---------- ERROR ---------- */
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error"),
    meta: { title: `Page don't found ${BASE_URL_TITLE}` }
  }
  /* -----X----- ERROR -----X----- */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = localStorage.getItem("access_token");

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
