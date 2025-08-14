// api的统一管理

import request from "./request";

// 内容页左侧数据

export default {
    getCountData(){
        return request({
            url: "/home/getCountData",
            method: "get",
        });
    },
    getChartData(){
        return request({
            url: "/home/getChartData",
            method: "get",
        });
    },
    getStudentData(params){
        return request({
            url: '/student/getStudentData',
            method: "get",
            data:params,
        });
    },
    deleteStudent(params){
        return request({
            url: '/student/deleteStudent',
            method: "get",
            data:params,
        });
    },
    addStudent(params){
        return request({
            url: '/student/addStudent',
            method: "post",
            data:params,
        });
    },
    editStudent(params){
        return request({
            url: '/student/editStudent',
            method: "post",
            data:params,
        });
    },
    getMenu(params){
        return request({
            url: '/permission/getMenu',
            method: "post",
            data:params,
        });
    },
    getScoreTable(){
        return request({
            url: '/score/getScoreTable',
            method: "get",
        });
    },
    studyTasks(){
        return request({
            url: '/study/studyTasks',
            method: "get",
        });
    },
    getTeachTable(){
        return request({
            url: '/teach/getTeachTable',
            method: "get",
        });
    },
    getTeachBar(){
        return request({
            url: '/teach/getTeachBar',
            method: "get",
        });
    },
};