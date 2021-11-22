import { createRouter, createWebHistory } from "vue-router";
// import Cookies from 'js-cookie'
<<<<<<< HEAD
import Home from "../components/Home.vue";
import Cesium from "../components/CesiumTest.vue";
// import HomeTest from '../components/HomeTest.vue'
import Water from "../components/Water.vue";
import uasHome from "../views/uasHome.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        { path: "cesium", name: "cesium", component: Cesium },
        { path: "water", name: "water", component: Water },
      ],
    },
    {
      path: "/uas",
      name: "uasHome",
      component: uasHome,
    },
  ],
});
=======
import Home from '../components/Home.vue'
import Cesium from '../components/Cesium.vue'
import Water from '../components/Water.vue'
import Test from '../components/Test.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:Home,
            children: [
                { path: "cesium", name: 'cesium', component: Cesium },
                { path: "water", name: 'water', component: Water },
                { path: "test", name: 'test', component: Test },
            ]
        },
    ]
})
>>>>>>> 2b7e73eef638e7da223cf7e35e4eb63363b396ff

router.beforeEach((to, from, next) => {
  // if (to.name !== 'login' && !Cookies.get('username')) next({ name: 'login' })
  // else
  next();
});

<<<<<<< HEAD
export default router;
=======
export default router
>>>>>>> 2b7e73eef638e7da223cf7e35e4eb63363b396ff
