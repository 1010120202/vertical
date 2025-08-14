 <script setup>
import { ref,computed } from 'vue';
import { useAllDataStore } from '../stores';
import { useRouter,useRoute } from 'vue-router'

const noChildren = computed(()=>list.value.filter(item=>!item.children))
const hasChildren = computed(()=>list.value.filter(item=>item.children))

const store = useAllDataStore()
//  const list =ref([
//       	{
//           path: '/home',
//           name: 'home',
//           label: '首页',
//           icon: 'house', 
//           url: 'Home'
//       	},
        // {
        //     path: '/score',
        //     name: 'score',
        //     label: '成绩管理',
        //     icon: 'list',
        //     url: 'Score'
        // },
//         {
//             path: '/student',
//             name: 'student',
//             label: '学生管理',
//             icon: 'user',
//             url: 'Student'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'location',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])
// 通过ref包裹的数据，要用value
const list = computed(()=>store.state.menuList)

const isCollapse = computed(()=>store.state.isCollapse)
const width = computed(()=>store.state.isCollapse ? '64px' : '180px')

const router = useRouter()
const route = useRoute()
const activeMenu = computed(()=>route.path)
const handleMenu=(item)=>{
    router.push(item.path)
    store.selectMenu(item)
}
 </script>
 
 <template>
    <el-aside :width="width">
        <el-menu
            background-color="#386a8e"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
        >
        <h3 v-show="!isCollapse">123学校系统管理</h3>
        <h3 v-show="isCollapse">后台</h3>
        <el-menu-item
            v-for="item in noChildren"
            :index="item.path"
            :key="item.path"
            @click="handleMenu(item)"
        >
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <!-- <el-sub-menu
            v-for="item in hasChildren"
            :index="item.path"
            :key="item.path"
        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                v-for="subItem in item.children"
                :index="subItem.path"
                :key="subItem.path"
            >
                <component class="icons" :is="subItem.icon"></component>
                <span>{{ subItem.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
          </el-sub-menu> -->
      </el-menu>
    </el-aside>
 </template>
 
 <style scoped lang="less">
.icons{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
.el-menu{
    border-right:none;
    h3{
        padding: 5px;
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
.el-aside{
    height: 100%;
    background-color: #386a8e;
}
 </style>