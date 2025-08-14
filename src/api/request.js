import axios from "axios";
import { ElMessage } from "element-plus";
import config from "../config";

const service = axios.create({
    // 设置基地址
    baseURL:config.baseApi,
})
const NETWORK_ERROR = '请检查错误'
// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    (res)=>{
        const {code,data,msg} = res.data
        if(code === 200){
            return data
        }else{
            ElMessage.error(msg || NETWORK_ERROR)
            return Promise.reject(msg || NETWORK_ERROR)
        }
    }    
);

function request(options){
    options.method = options.method || "get";
    // 调整get请求参数，使不论什么请求，都统一使用data
    if(options.method.toLowerCase() === "get"){
        options.params = options.data;
    }
    // mock开关的处理
    let isMock = config.mock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock
    }
    // 线上环境不能使用mock
    if(config.env === 'prod'){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request