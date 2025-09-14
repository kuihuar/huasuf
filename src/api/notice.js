import request from './request.js'

// 获取公告列表
export function getNoticeList(params = {}) {
  return request({
    url: '/notice',
    method: 'get',
    params
  })
}

// 获取公告详情
export function getNoticeDetail(id) {
  return request({
    url: `/notice/${id}`,
    method: 'get'
  })
}

// 获取最新公告（用于首页滚动显示）
export function getLatestNotices(limit = 5) {
  return request({
    url: '/notice/latest',
    method: 'get',
    params: { limit }
  })
}
