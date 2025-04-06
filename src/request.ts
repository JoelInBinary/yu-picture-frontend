import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 60000,
  withCredentials: true,
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response
    if (data.code === 40100) {
      // 如果用户发送的不是登录请求，并且用户目前不是已经在用户登录页面的情况下，则跳转到登录页面
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

//默认导出
export default instance;
