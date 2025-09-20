import request from './request.js'

// 获取工程列表
export function getConstructionList(params = {}) {
  return request({
    url: '/construction/GetConstructionList',
    method: 'get',
    params
  })
}

// 获取工程详情
export function getConstructionDetail(id) {
  return request({
    url: `/construction/GetConstructionDetail`,
    params: { id },
    method: 'get'
  })
}

// 获取最新工程（用于首页显示）
export function getLatestConstructions(limit = 5) {
  return request({
    url: '/constructionManage/getConstructionManagePublic',
    method: 'get',
    params: { limit }
  })
}
