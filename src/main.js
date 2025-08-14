import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import "@/assets/less/index.less"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import "@/api/mock.js"
import api from '@/api/api'
import { useAllDataStore } from './stores'

function isRoute(to){
  return router.getRoutes().filter(item=>item.path === to.path ).length > 0
}
router.beforeEach((to,from)=>{
  if(to.path !=='/login' && !store.state.token){
    return 
  }
  if(!isRoute(to)){
    return {name:"404"}
  }
})
const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$api = api
app.use(ElementPlus)
app.use(pinia)
const store = useAllDataStore()
store.addMenu(router,"refresh")
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
