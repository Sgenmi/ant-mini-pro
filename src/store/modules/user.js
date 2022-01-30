/**
 * @author Sgenmi
 * @date 2021-10-08
 * @Wx:150560159
 */

import { login,logout,getInfo } from "@/api/user";
import { ACCESS_TOKEN,USER_INFO } from "../../utils/config";
const user={
  namespaced: true,
  state :{
    token: '',
    userInfo: localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO)) : null,
    userRoutes: []
  },
  mutations:{
    SET_USER_TOKEN(state,token){
      if(token){
        state.token = token;
        localStorage.setItem(ACCESS_TOKEN,token)
      } else {
        state.token = '';
        localStorage.removeItem(ACCESS_TOKEN)
      }
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
    }
  },

  actions:{
    //登录
    async Login({commit},data){
      try {
        const res =  await login(data);
        if(res.code===0){
          const userInfo = res.data;
          commit('SET_USER_TOKEN',userInfo.token);
          commit('SET_USER_INFO',userInfo);
          return Promise.resolve()
        }else {
          return Promise.reject(res.msg)
        }
      }catch (e) {
        console.log(e)
      }
    },
    //退出
    async Logout({commit},){
      await logout();
      commit('SET_USER_TOKEN', '');
      return Promise.resolve();
    },
    GetInfo({commit}){
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if(res.code===0){
            // todo 获取用户信息
            // const userInfo = res.data;
            // commit('SET_USER_INFO',userInfo);
            resolve(res)
          }else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user