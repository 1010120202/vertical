<script setup>
import {useRouter} from 'vue-router'
const router =useRouter()

const getImageUrl = (img) => {
      return new URL(`../assets/images/${img}.png`, import.meta.url).href;
}

const goHome=()=>{
    //go方法：按指定方向访问历史。如果是正数则是路由记录向前跳转，如果是负数则是向后回退
    //这里我们回退两个页面到跳转前的页面
    router.go(-2)
}

</script>

<template>
    <div class="exception">
       <div class="error-code">404</div>
        <div class="error-message">页面未找到</div>
        <div>
            <el-button class="btn-home" type="primary" @click="goHome">回到上一个页面</el-button>
        </div>
    </div>
</template>

<style lang="less">
.exception {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            position: relative;
            background-color: #C8D6E5;
        }
        .exception::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(0,0,0,0.05) 0%, transparent 20%),
                radial-gradient(circle at 80% 80%, rgba(0,0,0,0.05) 0%, transparent 20%),
                radial-gradient(circle at 20% 80%, rgba(0,0,0,0.05) 0%, transparent 30%),
                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 0%, transparent 30%);
            background-size: 200px 200px, 300px 300px, 150px 150px, 250px 250px;
            z-index: -1;
        }
        .error-code {
            font-size: 160px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .error-message {
            font-size: 24px;
            color: #666;
            margin-bottom: 40px;
        }
</style>