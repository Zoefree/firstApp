import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/home.vue"),
    children: [
      {
        name: "overTime",
        path: "/home/overtimes",
        component: () => import("@/views/works/overTimes.vue"),
      },
    ],
  },
  {
    name: "login",
    path: "/",
    component: () => import("@/views/login.vue"),

    meta: {
      title: "登录",
      authority: false,
    },
  },
];
const router = new createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
