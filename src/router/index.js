import {createRouter,createWebHashHistory} from 'vue-router'

// 制定路由规则
const routes = [
    {
        path:"/",
        name:'main',
        component:()=>import('@/views/Main.vue'),
        redirect:"/login",
        children:[
            // {
            //     path:"home",
            //     name:'home',
            //     component:()=>import('@/views/Home.vue')
            // },
            // {
            //     path:"student",
            //     name:"student",
            //     component:()=>import('@/views/Student.vue')
            // },
            // {
            //     path:"score",
            //     name:"score",
            //     component:()=>import('@/views/Score.vue')
            // },
            // {
            //     path:"study",
            //     name:"study",
            //     component:()=>import('@/views/Study.vue')
            // },
        ]
    },
    {
        path:"/login",
        name:"login",
        component:()=>import('@/views/Login.vue')
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
    }
]

const router = createRouter({
    // 设置路由模式
    history:createWebHashHistory(),
    routes
})

export default router