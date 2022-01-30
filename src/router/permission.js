import store from '@/store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import {ACCESS_TOKEN} from "../utils/config"; // progress bar custom style
import config from "../utils/config"; // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import router from "@/router"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
};

const isHaveRouter=function (routes,currentPath){
  let boolean = false
  for (let i = 0; i < routes.length; i++) {
    const { path, children = [] } = routes[i]
    if (path === currentPath) {
      boolean = true
    } else if (children.length > 0) {
      boolean = isHaveRouter(children, currentPath)
    }
    if (boolean) {
      break
    }
  }
  return boolean;
}

const domTitle = config.title;

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/login'
const defaultRoutePath = '/home/dashboard'

export const permissionController = (to,from,next)=>{
    NProgress.start()
    to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
    /* has token */

    if (storage.get(ACCESS_TOKEN)) {
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        if (store.getters.addRouters.length === 0) {
           store.dispatch('user/GetInfo').then(res => {
              // generate dynamic router
              store.dispatch('GenerateRoutes').then(() => {
                store.getters.addRouters.forEach(r => {
                  router.addRoute(r)
                });

                // console.log(router.getRoutes());
                // 请求带有 redirect 重定向时，登录自动重定向到该地址
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  next({ ...to })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            })
            .catch(() => {
              notification.error({
                message: '错误',
                description: '请求用户信息失败，请重试'
              })
              // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
              // store.dispatch('Logout').then(() => {
              //   next({ path: loginRoutePath, query: { redirect: to.fullPath } })
              // })
            })
        } else {
          if(isHaveRouter(router.getRoutes(),to.path) || to.path==='/'){
            next()
          }else {
            next('/404')
          }
        }
      }
    } else {
      if (allowList.includes(to.name)) {
        // 在免登录名单，直接进入
        next()
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
}