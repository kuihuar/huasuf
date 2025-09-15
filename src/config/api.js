// API配置常量
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:8888/' : '/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
}

// 环境相关配置
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
} 