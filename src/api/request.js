import axios from 'axios'

// 创建axios实例
const request = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : '/api',
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8888/' : '/api',

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

export default request
