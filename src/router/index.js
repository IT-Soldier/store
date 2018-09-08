import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
// webpack自行将vue-router设置好了
const Header = {
  template: `
      <div>
          <h1>childCom局部组件</h1>
      </div>
  `
};
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      name: 'Login',
      path: '/Login',
      component: Login
    },
    {
      name: 'Home',
      path: '/Home',
      component: Home,
    }
  ]
});
