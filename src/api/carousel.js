import request from './request.js'

// 获取轮播图数据
export function getCarouselList() {
  return request({
    // url: '/carousel',
    url: '/Carousel/getCarouselManagePublic',
    method: 'get'
  })
}

// 获取轮播图详情
export function getCarouselDetail(id) {
  return request({
    url: `/carousel/${id}`,
    method: 'get'
  })
}
