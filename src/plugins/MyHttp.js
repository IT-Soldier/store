import axios from 'axios';
// 封装axios插件,这样可以不用每个发请求的页面都去引入axios模块
// import Vue from 'vue';//下面的Vue
// 按需加载
import { Loading, Message } from 'element-ui';
// 创建一个对象,即是要暴露出去的插件名称
const MyHttp = {};
// Vue的插件应当有一个公开方法install
MyHttp.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  Vue.prototype.$http = axios;
  // loadingInstance是一个加载动画,比如说解决数据请求事件比较耗时的操作
  // 在请求拦截与响应拦截外定义变量,使其可以被拿到
  let loadingInstance = null;
  // Add a request interceptor 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 如果url不是登录页,发请求前向请求头中配置token
    if(config.url !== 'login') {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    // 发送请求之前，显示loading 在请求拦截处打开,就一定要在响应拦截后关闭
    loadingInstance = Loading.service();
    // config里面有一堆请求头相关的东西,包括请求路径(或者叫路由的path),请求方法
    // 一定要return config,这是供浏览器识别的
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  // Add a response interceptor 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    // 隐藏加载提示
    loadingInstance.close();
    // 响应拦截,处理请求失败后的提示信息,防止反复判断
    const {msg, status} = response.data.meta;
    if(status === 200 || status === 201) {
      // 响应成功,此处不做处理
    } else {
      // 响应失败
      Message.warning(msg);
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
};
// 将接口暴露出去
export default MyHttp;
