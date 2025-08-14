<script setup>
import { computed,getCurrentInstance, ref, onMounted } from 'vue';

const {proxy} = getCurrentInstance()
let data = ref([])
const tableData = ref([])
const input = ref('')
// 添加控制表格显示的状态变量，初始为false（不显示）
const showTable = ref(false)

const getScoreTable = async ()=>{
    data = await proxy.$api.getScoreTable()
}

const clickSearch = () => {
  const searchTerm = input.value.trim()
  showTable.value = true
  
  // 根据输入内容展示对应学期数据
  switch (searchTerm) {
    case '大一上学期':
      tableData.value = data.firstYear?.firstTerm || []
      break
    case '大一下学期':
      tableData.value = data.firstYear?.secondTerm || []
      break
    case '大二上学期':
      tableData.value = data.secondYear?.firstTerm || []
      break
    case '大二下学期':
      tableData.value = data.secondYear?.secondTerm || []
      break
    case '大三上学期':
      tableData.value = data.threeYear?.firstTerm || []
      break
    case '大三下学期':
      tableData.value = data.threeYear?.secondTerm || []
      break
    case '大四上学期':
      tableData.value = data.fourYear?.firstTerm || []
      break
    case '大四下学期':
      tableData.value = data.fourYear?.secondTerm || []
      break
    default:
      // 输入不符合预期时给出提示
      proxy.$message.warning('格式错误')
      tableData.value = []
  }
}

// 计算包含总成绩的数据
const computedTableData = computed(() => {
  return tableData.value.map(item => {
    const mid = Number(item.midScore);
    const final = Number(item.finalScore);
    const daily = Number(item.dailyScore);
    // 期中20% + 平时30% + 期末50%
    const total = mid * 0.2 + daily * 0.3 + final * 0.5;
    // 返回新对象，保留原有属性并添加计算后的总成绩（保留一位小数）
    return {
      ...item,
      totalScore: total.toFixed(1)
    };
  });
});

onMounted(()=>{
  getScoreTable()
  
})
</script>

<template>
<div class="score">
    <el-input 
    v-model="input" 
    style="width:240px" 
    placeholder="例：大二上学期"
    ></el-input>
    <el-button
    type="primary"
    @click="clickSearch"
    style="margin-left: 20px"
    size="large"
    >搜索</el-button>
    <div class="table" v-if="showTable">
         <el-table :data="computedTableData" style="width: 1260px">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="className" label="课程名" width="180" />
            <el-table-column prop="midScore" label="期中成绩" width="180"/>
            <el-table-column prop="finalScore" label="期末成绩" width="180"/>
            <el-table-column prop="dailyScore" label="平时成绩" width="180"/>
            <el-table-column prop="totalScore" label="总成绩" width="180"/>
        </el-table>
    </div>
</div>
</template>

<style scoped lang="less">
.score{
    :deep(.el-input__inner){
        height: 50px;
    }
    .table{
        margin-top: 50px;
        :deep(.cell){
            text-align: center;
        }
    }
}
</style>