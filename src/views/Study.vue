<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance()

// 状态管理
const allTasks = ref([]);
const currentPage = ref(1);
const pageSize = ref(9); // 每页9个项目（3行×3列）
const currentTasks = ref([]);

const getStudyTasks = async ()=>{
    const data = await proxy.$api.studyTasks()
    allTasks.value = data; 
    updateCurrentTasks()
}

// 初始化数据
onMounted(() => {
  getStudyTasks()
});

// 更新当前页显示的任务
const updateCurrentTasks = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  currentTasks.value = allTasks.value.slice(start, end);
};

// 分页事件处理
const handlePageChange = (page) => {
  currentPage.value = page;
  updateCurrentTasks();
};

// 获取标签类型
const getTagType = (status) => {
  return status === '待提交' ? 'warning' : 'success';
};

</script>

<template>
  <div class="container">
    <el-row :gutter="30"> <!-- 增加列之间的间距 -->
      <el-col :span="8" v-for="task in currentTasks" :key="task.id" class="task-col">
        <el-card class="task-card"> <!-- 卡片增加margin -->
          <template #header>
            <div class="card-header">
              <span>{{ task.title }}</span>
              <el-tag :type="getTagType(task.status)">{{ task.status }}</el-tag>
            </div>
          </template>
          <div class="deadline">截止: {{ task.deadline }}</div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 分页控件 -->
    <div class="pagination">
      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="allTasks.length"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
    position: relative;
    padding: 30px; /* 增加容器内边距 */
    max-width: 1400px; /* 适当加宽容器最大宽度 */
    margin: 0 auto;
    .task-col {
        margin-bottom: 30px; /* 增加行与行之间的垂直间距 */
        .task-card {
            margin: 0 15px; /* 增加卡片左右margin */
            padding: 15px; /* 增加卡片内部padding */
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
        }
        .deadline {
            color: #666;
            font-size: 14px;
            text-align: right;
        }
    }
    .pagination {
        margin-top: 30px;
        position: absolute;
        right: 50px;
        text-align: center;
    }
}
</style>
