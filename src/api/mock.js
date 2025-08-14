import Mock from "mockjs";
import homeApi from './mockData/home'
import studentApi from './mockData/student'
import permissionApi from './mockData/permission'
import scoreApi from './mockData/score'
import studyApi from './mockData/study'
import teachApi from './mockData/teach'

// 拦截路径-方法-制造出的假数据
Mock.mock(/home\/getCountData/,"get",homeApi.getCountData)
Mock.mock(/home\/getChartData/,"get",homeApi.getChartData)
Mock.mock(/student\/getStudentData/,"get",studentApi.getStudentList)
Mock.mock(/student\/deleteStudent/,"get",studentApi.deleteStudent)
Mock.mock(/student\/addStudent/,"post",studentApi.createStudent)
Mock.mock(/student\/editStudent/,"post",studentApi.editStudent)
Mock.mock(/permission\/getMenu/,"post",permissionApi.getMenu)
Mock.mock(/score\/getScoreTable/,"get",scoreApi.getScoreTable)
Mock.mock(/study\/studyTasks/,"get",studyApi.studyTasks)
Mock.mock(/teach\/getTeachTable/,"get",teachApi.getTeachTable)
Mock.mock(/teach\/getTeachBar/,"get",teachApi.getTeachBar)