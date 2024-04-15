import {createRouter, createWebHistory} from 'vue-router';

// 导入需要路由的组件
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

// 定义路由
const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/register', component: Register }
];

const routerHistory = createWebHistory()

// 创建路由实例
const router = createRouter({
    history: routerHistory,
    routes
})

// 导出路由实例
export default router;
