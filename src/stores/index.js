import { defineStore } from "pinia";
import { ref, watch } from "vue";

function initState(){
    return {
        isCollapse:false,
        tags:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'home'
            },
        ],
        currentMenu:null,
        menuList:[],
        token:"",
        routerList:[]
    }
}

export const useAllDataStore = defineStore('allData',()=>{

    const state = ref(initState())

    watch(state,(newObj)=>{
        if(!newObj.token) return 
        localStorage.setItem("store",JSON.stringify(newObj))
    },
    {deep: true})

    function selectMenu(val){
        if(val.name === "home"){
            state.value.currentMenu = null
        }else{
            state.value.currentMenu = val;
            let index = state.value.tags.findIndex(item=>item.name === val.name)
            index === -1 ? state.value.tags.push(val) : ""
        }
    }

    function updateMenuList(val){
        state.value.menuList = val
    }

    function addMenu(router,type){
        if(type === 'refresh'){
            if(JSON.parse(localStorage.getItem('store'))){
                state.value  = JSON.parse(localStorage.getItem("store"))
                state.value.routerList = []
            }else{
                return
            }
        }
         // module 返回一个对象,键：组件文件路径（如 ../views/Login.vue）,值：对应组件的异步导入函数（用于动态加载组件）
        const menu = state.value.menuList
        const module = import.meta.glob('../views/**/*.vue')
        const routerArr = []
        // menuList 来自 permission 注入，转变成 router 里的类型
        menu.forEach(item=>{
            if(item.children){
                item.children.forEach(val=>{
                    let url = `../views/${val.url}.vue`
                    val.component = module[url]
                    routerArr.push(...item.children)
                })
            }else{
                let url = `../views/${item.url}.vue`
                item.component = module[url]
                routerArr.push(item)
            }
        })
        state.value.routerList = []
        let routers = router.getRoutes()
        routers.forEach(item=>{
            if(item.name == 'main' || item.name == 'login' || item.name == '404'){
                return
            }else{
                router.removeRoute(item.name)
            }
        })
        routerArr.forEach(item=>{
            state.value.routerList.push(router.addRoute("main",item))
        })
    }

    function clean(){
        state.value.routerList.forEach((item)=>{
            if(item) item()
        })
    state.value = initState()
    localStorage.removeItem("store")
    }

    return { 
        state, 
        selectMenu,
        updateMenuList,
        addMenu,
        clean
    }
})