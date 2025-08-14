<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
</script>

<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 左侧 -->
            <common-aside />
            <!-- 右侧 -->
            <el-container>
                <el-header class="el-header">
                    <common-header />
                </el-header>
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout,
.lay-container{
    height: 100%;
}
.el-header{
    background-color: #386a8e;
}
</style>