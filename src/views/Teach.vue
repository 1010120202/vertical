<script setup>
import { ref,reactive,getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts'

const tableData = ref([])
const {proxy} = getCurrentInstance()
const observer = ref(null)
const getTeachTable= async ()=>{
    const data = await proxy.$api.getTeachTable()
    tableData.value = data
}

const tableLabel = reactive([
    {
        prop:'data',
        label:'日期',
        width:'80px'
    },
    {
        prop:'className',
        label:'课程名',
        width:'120px'
    },
    {
        prop:'classroomName',
        label:'教室',
    },
    {
        prop:'lesson',
        label:'上课时间',
    },
    {
        prop:'classTime',
        label:'课时',
        width:'80px'
    },
    {
        prop:'class',
        label:'班级',
        width:'80px'
    },
    {
        prop:'ps',
        label:'备注',
    },
])

const option = reactive({
  title: {
    text: '最新上课情况统计表',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 2, name: '逃课' },
        { value: 10, name: '已请假' },
        { value: 6, name: '上课迟到' },
        { value: 4, name: '上课玩手机' },
        { value: 5, name: '提前离开' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

const barOption = reactive({
    title: {
        text: '最新作业提交情况',
    },
    legend: {},
    tooltip: {},
    dataset: {},
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }]
})

const getTeachPie = async ()=>{
    const echart = echarts.init(proxy.$refs['echart'])
    echart.setOption(option)

    const data = await proxy.$api.getTeachBar()
    // console.log(data);
    barOption.dataset = data
    console.log(barOption);
    
    const workEchart = echarts.init(proxy.$refs['workEchart'])
    workEchart.setOption(barOption)
    
    
     observer.value = new ResizeObserver(()=>{
        echart.resize()
    })

    if(proxy.$refs['echart']){
        observer.value.observe(proxy.$refs['echart'])
    }
}

onMounted(()=>{
    getTeachTable()
    getTeachPie()
})

</script>

<template>
    <el-row :gutter="20" class="teach">
        <el-col :span="12" class="left">
            <el-descriptions class="left-top-des" column="1">
                <el-descriptions-item label="Photo"><img src="../assets/images/user.png" class="photo"></el-descriptions-item>
                <el-descriptions-item label="Name">李四</el-descriptions-item>
                <el-descriptions-item label="academic title">教授</el-descriptions-item>
                <el-descriptions-item label="Remarks">
                <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Address">河北省石家庄市新华区</el-descriptions-item>
                <el-descriptions-item label="Honor">全球计算机教育创新奖（2023）,开源项目杰出贡献者（2022）,计算机学科教学名师（2021）。</el-descriptions-item>
                <el-descriptions-item label="Motto">在0与1的世界里，写一行改变世界的代码；于逻辑的迷宫中，找一条通向创新的路径。</el-descriptions-item>
            </el-descriptions>
             <el-card class="left-bottom-card" style="margin-top: 20px;">
                <template #header>
                <div class="card-header">
                    <span @click="handleClick">2024-2025学年第2学期</span>
                </div>
                </template>
                 <el-table :data="tableData" border style="width: 100%">
                    <el-table-column 
                        v-for="item in tableLabel"
                        :key="item.prop"
                        :width="item.label === '备注' ? 'auto' : (item.width ? item.width : 100)" 
                        :prop="item.prop"
                        :label="item.label"
                    />
                </el-table>
            </el-card>
            
        </el-col>
        <el-col :span="12" class="right">  
            <el-card class="right-top-card">
                <div ref="workEchart" style="height:320px"></div>
            </el-card>
            <el-card class="left-bottom-card" style=" margin-top: 20px">
                <div ref="echart" style="height:320px"></div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.teach{
    height:100%;
    overflow: hidden;
    .left{
        .left-top-des{
            .photo{
                width: 80px;
                height: 80px;
                vertical-align: middle;
            }
            :deep(.el-descriptions-item__label) {
                display: inline-block; 
                vertical-align: middle; // 标签也垂直居中
            }
            :deep(.el-descriptions__cell){
                padding: 10px;
                font-size: 16px;
                border-bottom: 1px dashed #e0e0e0; // 虚线分隔
            }
        }
        :deep(.el-table__cell){
            font-size: 16px;
            text-align: center;
        }
    }
}
</style>