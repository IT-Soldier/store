// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 专门用来处理时间格式
import moment from 'moment';
// 所有的组件均基于element-ui,所以必须引入
import ElementUI from 'element-ui';
// 所以相应的css样式也务必引入
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import MyHttp from '@/plugins/MyHttp';
// 引入面包屑组件,以供全局使用
import Breadcrumb from '@/component/Breadcrumb';
// Vue.configproductionTip干掉了控制台的一些有关代码生产模式的一些提醒,自己生成的
Vue.config.productionTip = false;
// 全局注册面包屑组件
Vue.component(
  Breadcrumb.name, Breadcrumb
);
// 注册axios插件
Vue.use(MyHttp);

// ElementUI为插件,当然要先注册后,全局使用
Vue.use(ElementUI);
// 全局注册过滤器,第1个参数为模板中用的格式函数
// value为管道符号前面的值,是要处理的数据,会自动传入,不用刻意传值
// formatStr是要时间最后被处理成的形式,是需要在模板中传入的
Vue.filter('format', (value, formatStr) => {
  return moment(value).format(formatStr);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  // 此处template的操作类似于render
  template: '<App/>'
});
