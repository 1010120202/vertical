<script setup>
import { reactive,getCurrentInstance,onMounted } from 'vue';
import { useAllDataStore } from '../stores';
import { useRouter } from 'vue-router';
const loginForm = reactive({
    username:"",
    password:""
})
const getImageUrl = (img) => {
      return new URL(`../assets/images/${img}.png`, import.meta.url).href;
}
const login = "login"
const {proxy} = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()
const handleLogin = async ()=>{
    const res = await proxy.$api.getMenu(loginForm)
    // console.log(res.menuList);
    store.updateMenuList(res.menuList)
    store.state.token = res.token
    store.addMenu(router)
    store.state.currentMenu = null
    router.push('/home')
}
</script>

<template>
    <div class="body-login">
      <img :src="getImageUrl(login)" />
        <el-form :model="loginForm" class="login-container">
            <h1>欢迎登录</h1>
            <el-form-item>
                <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang="less">
.body-login{
    position: relative;
    img {
        width: 100%;
        height: 100vh;
    }
    .login-container{
        width: 500px;
        background-color: #93c6eb;
        border: 1px solid #bbb6b6;
        border-radius: 50px;
        padding: 40px 40px 20px 40px;
        box-shadow: 0 0 25px #cacaca;
        position: absolute;
        top: 300px;
        right: 250px;
        h1{
            text-align: center;
            margin-bottom: 25px;
            color: #fff;
            font-size: 30px;
        }
        :deep(.el-form-item__content){
            justify-content: center;
        }
    }
}
</style>