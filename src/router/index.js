import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import {asyncRouterMap,constantRouterMap} from './routes'

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { permissionController } from "@/router/permission";

const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  // history: createWebHistory(),
  // routes:asyncRouterMap.concat(constantRouterMap)
  routes:constantRouterMap
})

router.beforeEach(permissionController)
router.afterEach((to, from) => {
  NProgress.done();
})
export default router
