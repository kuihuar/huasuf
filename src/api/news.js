import request from './request.js'

// 获取新闻列表
export function getNewsList(params = {}) {
  return request({
    url: '/news/getNewsPublic',
    method: 'get',
    params
  })
}

// 获取新闻（详情
export function getNewsDetail(id) {
  return request({
    url: `/news/getNewsPublic/${id}`,
    method: 'get'
  })
}

// 获取最新新闻（用于首页滚动显示）
// export function getLatestNews(limit = 5) {
//   return request({
//     // url: '/notice/latest',
//     url: '/news/latest',
//     method: 'get',
//     params: { limit }
//   })
// }
