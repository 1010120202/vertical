<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'

const { proxy } = getCurrentInstance()
const value = ref(new Date())
const countData = ref([])
const chartData = ref([])
const observer = ref(null)

// 折线图渲染
const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#00FF46", "#001BFF", "#FF0004"],
      series: [],
})

const getCountData = async()=>{
    const data = await proxy.$api.getCountData()
    // console.log(data);
    countData.value = data
}
const getChartData = async()=>{
    const lineData = await proxy.$api.getChartData()
    // console.log(lineData);
    xOptions.xAxis.data = lineData.date
    xOptions.series = Object.keys(lineData.data[0]).map(val=>({
        name:val,
        data:lineData.data.map(item=>item[val]),
        type:'line'
    }))
    const echart = echarts.init(proxy.$refs['echart'])
    echart.setOption(xOptions)

    observer.value = new ResizeObserver(()=>{
        echart.resize()
    })

    if(proxy.$refs['echart']){
        observer.value.observe(proxy.$refs['echart'])
    }
}

onMounted(()=>{
    getCountData()
    getChartData()
})
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:30px">
            <el-calendar v-model="value" />
        </el-col>
        <el-col :span="16" style="margin-top:30px">
            <div class="count">
                <el-card
                    :body-style="{display:'flex',padding:0}"
                    v-for="item in countData"
                    :key="item.name"
                >
                    <component :is="item.icon" class="icons" :style="{background:item.color}" />
                    <div class="detail">
                        <p class="txt">{{ item.name }}</p>
                        <p class="num">{{ item.value }}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="top-echart">
                <div ref="echart" style="height:400px"></div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.home{
    height:100%;
    overflow: hidden;
    .count{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-card{
            width: 32%;
            height: 200px;
            margin-bottom: 20px;
        }
        .icons{
            width: 200px;
            height: 200px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }
        .detail{
            margin-left: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .txt{
                font-size: 40px;
                color: #386a8e;
            }
            .num{
                font-size: 30px;
                margin-top: 30px;
                margin-left: 28px;
            }
        }
    }
}
</style>