import http from "../utils/request";

const Api = {
  login: '/manage/member/login',
  getInfo: '/manage/main/getInfo',
  logout: '/logout',
  getUserMenusArray: '/manage/main/getMenu',
}

export const login = data => {
  return http.request({
    url: Api.login,
    data: data,
    method: 'post'
  })
}

export const getInfo = data => {
  return http.request({
    url: Api.getInfo,
  })
}

export const getMenu = data => {
  return http.request({
    url: Api.getUserMenusArray,
  })
}


export const logout = data=>{
  return http.request({
    url: Api.logout,
    data: data,
    method: 'post'
  })
}