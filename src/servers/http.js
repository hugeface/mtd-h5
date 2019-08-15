/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

// 模拟数据和接口之间切换的功能

import axios from 'axios'
import qs from 'qs'
// import store from '../store/store'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = location.origin
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = location.origin
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = location.origin
}

// 请求超时时间
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
//

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params, type) {
  return new Promise((resolve, reject) => {
    // params._t = new Date() * 1;

    if (type === 'form') {
      // post请求头
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      axios.post(url, qs.stringify(params))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    } else {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
      axios.post(url, JSON.stringify(params))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    }
  })
}
