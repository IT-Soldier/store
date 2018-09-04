//封装axios插件,这样可以不用每个发请求的页面都去引入axios模块
// import Vue from 'vue';//下面的Vue
import axios from 'axios';

// 创建一个对象,即是要暴露出去的插件名称
const MyHttp = {};
// Vue的插件应当有一个公开方法install
MyHttp.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  Vue.prototype.$http = axios;
}
