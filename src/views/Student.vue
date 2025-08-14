<script setup>
import {ref, getCurrentInstance, onMounted,reactive,nextTick} from 'vue'
import {ElMessage,ElMessageBox} from 'element-plus'

const tableData = ref([])
const {proxy} = getCurrentInstance()
const getStudentData = async ()=>{
    let data = await proxy.$api.getStudentData(config)
    // console.log(data);
    tableData.value = data.list.map(item=>({
        ...item,
        sexLabel : item.sex === 1 ? '男' : '女'
    }))
    config.total = data.count
}

const tableLabel = reactive([
    {
        prop:'name',
        label:'姓名'
    },
    {
        prop:'age',
        label:'年龄'
    },
    {
        prop:'sexLabel',
        label:'性别'
    },
    {
        prop:'birth',
        label:'出生日期',
        width:200
    },
    {
        prop:'addr',
        label:'地址',
        width:400
    },
])
const formInline = reactive({
    keyWord:''
})
const config = reactive({
    total:0,
    page:1,
    name:'',
})
const handleSearch = ()=>{
    config.name = formInline.keyWord
    // console.log(formInline.keyWord);
    // console.log(config.name);
    getStudentData()
    // console.log("search")
}
const handleChange = (page)=>{
    config.page = page
    getStudentData()
}
const handleDelete = (val)=>{
    ElMessageBox.confirm("你确定要删除吗").then(async ()=>{
        await proxy.$api.deleteStudent({id:val.id})
        ElMessage({
            showClose:true,
            message:"删除成功",
            type:'success'
        })
        getStudentData()
    })
}
const action = ref('add')
const dialogVisible = ref(false)
const formStudent = reactive({sex:'1'})
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})
const handleClose = ()=>{
    //关闭后重置表单
    dialogVisible.value = false
    proxy.$refs['studentForm'].resetFields()
}
const handleCancel = ()=>{
    dialogVisible.value = false
    proxy.$refs['studentForm'].resetFields()
}
const handleAdd = () =>{
    dialogVisible.value = true
    action.value = 'add'
}
const timeFormat = (time) =>{
    var time = new Date(time)
    const year = time.getFullYear()
    const month = time.getMonth()+1;
    const date = time.getDate();
    function add(m){
        return m < 10 ? "0"+m : m
    }
    return year + "-" + add(month) + "-" + add(date)
}
const onSubmit = () =>{
    proxy.$refs['studentForm'].validate(async (valid)=>{
        if(valid){
            let res = null
            formStudent.birth = /^\d{4}-\d{2}-\d{2}$/.test(formStudent.birth) ? formStudent.birth : timeFormat(formStudent.birth)
            // 新增
            if(action.value === 'add'){
                // 等待 API 请求完成，并向服务器提交新增学生的表单数据
                res = await proxy.$api.addStudent(formStudent)
            }else{
                res = await proxy.$api.editStudent(formStudent)
            }
            if(res){
                dialogVisible.value = false
                proxy.$refs['studentForm'].resetFields()
                getStuentData()
            }
        }else{
            ElMessage({
                showClose:true,
                message:'请输入正确的内容',
                type:'error'
            })
        }
    })
}
const handleEdit = (val)=>{
    action.value='edit'
    dialogVisible.value = true
    nextTick(()=>{
        Object.assign(formStudent,{...val,sex:''+val.sex})
    })
}
onMounted(()=>{
    getStudentData()
})
</script>

<template>
    <div class="student-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入学生姓名" v-model="formInline.keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column 
            v-for="item in tableLabel"
            :key="item.prop"
            :width="item.width ? item.width : 125"
            :prop="item.prop"
            :label="item.label"
        />
        <el-table-column fixed="right" label="Operations" min-width="120">
        <template #="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination 
        background
        class="pager"
        layout="prev,pager,next"
        size="small"
        :total="config.total" 
        @current-change="handleChange"
    />
    </div>
    <el-dialog
        v-model="dialogVisible"
        :title="action == 'add' ? '新增学生' : '编辑学生'"
        width="35%"
        :before-close="handleClose"
    >
        <!--需要注意的是设置了:inline="true"，
            会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
            在css进行处理-->
        <el-form :inline="true"  :model="formStudent" :rules="rules" ref="studentForm">
        <el-row>
            <el-col :span="12">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formStudent.name" placeholder="请输入姓名" />
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="formStudent.age" placeholder="请输入年龄" />
            </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
            <el-form-item class="select-clearn" label="性别" prop="sex">
                <el-select  v-model="formStudent.sex" placeholder="请选择">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker
                v-model="formStudent.birth"
                type="date"
                placeholder="请输入"
                style="width: 100%"
                />
            </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-form-item
            label="地址"
            prop="addr"
            >
            <el-input v-model="formStudent.addr" placeholder="请输入地址" />
            </el-form-item>
        </el-row>
        <el-row style="justify-content: flex-end">
            <el-form-item>
            <el-button type="primary" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-row>
        </el-form>
    </el-dialog>
</template>

<style scoped lang="less">
.student-header{
    display: flex;
    justify-content: space-between;
}
.table{
    position: relative;
    height: 520px;
    .pager{
        position: absolute;
        right: 10px;
        bottom: 30px;
    }
    .el-table{
        width: 100%;
        height: 500px;
    }
}
.select-clearn{
    display: flex;
}
</style>