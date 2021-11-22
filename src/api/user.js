import { get, post } from '@/utils/request'
// 登录
export const login = params => post(`/LoginController/login`, params)
//当前用户可访问的菜单列表
export const userList = () => get(`/sys/menu/userList`)
export const logout = params => get(`/LogoutController/logout`, params)
// 修改密码
export const changePwd = params => post(`/password/changePwd`, params)

