import http from "../utils/request";

export const getAdminList = data => {
  return http.request({
    url: '/manage/adminer/getAdminList',
    params: data,
    method: 'get'
  })
}

export const userSetStatus = data => {
  return http.request({
    url: '/manage/adminer/setStatus',
    data: data,
    method: 'post'
  })
}

export const getAuthCode = data => {
  return http.request({
    url: '/manage/adminer/getParentSelected',
    params: data,
    method: 'get'
  })
}

export const getParentSelected = data => {
  return http.request({
    url: '/manage/main/getAuthCode',
    params: data,
    method: 'get'
  })
}

export const getSelected = data => {
  return http.request({
    url: '/manage/group/getSelected',
    params: data,
    method: 'get'
  })
}

export const addAdmin = data => {
  return http.request({
    url: '/manage/user/addAdmin',
    data: data,
    method: 'post'
  })
}

export const getRoleTaskTree = data => {
  return http.request({
    url: '/manage/group/getRoleTaskTree',
    params: data,
    method: 'get'
  })
}

export const groupGetTask = data => {
  return http.request({
    url: '/manage/group/getTask',
    params: data,
    method: 'get'
  })
}

export const setTask = data => {
  return http.request({
    url: '/manage/group/setTask',
    data: data,
    method: 'post'
  })
}

export const getGroupList = data => {
  return http.request({
    url: '/manage/group/getList',
    params: data,
    method: 'get'
  })
}

export const addGroup = data => {
  return http.request({
    url: '/manage/group/add',
    data: data,
    method: 'post'
  })
}

export const groupEdit = data => {
  return http.request({
    url: '/manage/group/edit',
    data: data,
    method: 'post'
  })
}

export const groupSetStatus = data => {
  return http.request({
    url: '/manage/group/setStatus',
    data: data,
    method: 'post'
  })
}