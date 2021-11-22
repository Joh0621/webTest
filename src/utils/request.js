import axios from 'axios'
import Qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const service = axios.create({
  // baseURL: 'http://210.73.216.32:8081/oilgas-background/', //外网
  // baseURL: 'http://58.18.173.195:8082/oilgas-background/',//内网
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  crossDomain: true
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authSid'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code === 2001) {
      //token过期失效，跳转登录页
      // Message.error('token失效，请重新登录')
      removeToken() // must remove  token  first
      // resetRouter()
      // this.$store.getters.commit('RESET_STATE')
      // location.reload()
    }
    return response
  },
  error => {
    // Message.error('网络请求失败')
  }
)

// 封装get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    if (!params) {
      params = {
        timestamp: new Date().getTime()
      }
    } else {
      Object.assign(params, {
        timestamp: new Date().getTime()
      })
    }
    service.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * 以RequestParams的形式传递参数
 * @param {} url
 * @param {*} data
 */
export function postParams(url, data) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() },
      data: data
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// post方法封装
export function post(url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function deletefn(url, params) {
  return new Promise((resolve, reject) => {
    service.delete(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    })
      .catch(err => {
        reject(err.data)
        this.$notify({ message: '加载失败', type: 'error' })
      })
  })
}

export default service
