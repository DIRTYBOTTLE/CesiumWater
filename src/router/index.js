import {
    createRouter,
    createWebHistory
} from 'vue-router'
// import Cookies from 'js-cookie'
import Home from '../components/Home.vue'
import Cesium from '../components/CesiumTest.vue'
// import HomeTest from '../components/HomeTest.vue'
import Water from '../components/Water.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:Home,
            children: [
                { path: "cesium", name: 'cesium', component: Cesium },
                { path: "water", name: 'water', component: Water },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    // if (to.name !== 'login' && !Cookies.get('username')) next({ name: 'login' })
    // else
    next()
})

export default router