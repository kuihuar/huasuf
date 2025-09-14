# API接口文档

## 轮播图接口 (Carousel)

### 获取轮播图列表
- **URL**: `/api/carousel`
- **方法**: `GET`
- **描述**: 获取所有轮播图数据

#### 请求参数
无

#### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "华苏建设有限公司",
      "image": "/src/assets/images/baner_hsjs.jpg",
      "imageUrl": "/src/assets/images/baner_hsjs.jpg",
      "link": "#",
      "url": "#",
      "sort": 1,
      "status": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "title": "专题学习",
      "image": "/src/assets/images/banner_djxx169.jpg",
      "imageUrl": "/src/assets/images/banner_djxx169.jpg",
      "link": "#",
      "url": "#",
      "sort": 2,
      "status": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### 获取轮播图详情
- **URL**: `/api/carousel/{id}`
- **方法**: `GET`
- **描述**: 根据ID获取轮播图详情

#### 请求参数
- `id` (path): 轮播图ID

#### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "title": "华苏建设有限公司",
    "image": "/src/assets/images/baner_hsjs.jpg",
    "link": "#",
    "sort": 1,
    "status": 1,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
}
```

## 公告接口 (Notice)

### 获取公告列表
- **URL**: `/api/notice`
- **方法**: `GET`
- **描述**: 获取公告列表

#### 请求参数
- `page` (query, optional): 页码，默认1
- `limit` (query, optional): 每页数量，默认10
- `status` (query, optional): 状态，1-启用，0-禁用

#### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "title": "华苏建设有限公司企业负责人2023年度薪酬情况",
        "content": "公告内容...",
        "date": "2025-07-09",
        "publishTime": "2025-07-09T00:00:00Z",
        "createdAt": "2025-07-09T00:00:00Z",
        "link": "#",
        "url": "#",
        "status": 1
      }
    ],
    "total": 10,
    "page": 1,
    "limit": 10
  }
}
```

### 获取最新公告
- **URL**: `/api/notice/latest`
- **方法**: `GET`
- **描述**: 获取最新公告（用于首页滚动显示）

#### 请求参数
- `limit` (query, optional): 数量限制，默认5

#### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "华苏建设有限公司企业负责人2023年度薪酬情况",
      "date": "2025-07-09",
      "publishTime": "2025-07-09T00:00:00Z",
      "createdAt": "2025-07-09T00:00:00Z",
      "link": "#",
      "url": "#"
    },
    {
      "id": 2,
      "title": "省属企业2023年度工资分配信息披露表",
      "date": "2025-07-09",
      "publishTime": "2025-07-09T00:00:00Z",
      "createdAt": "2025-07-09T00:00:00Z",
      "link": "#",
      "url": "#"
    }
  ]
}
```

### 获取公告详情
- **URL**: `/api/notice/{id}`
- **方法**: `GET`
- **描述**: 根据ID获取公告详情

#### 请求参数
- `id` (path): 公告ID

#### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "title": "华苏建设有限公司企业负责人2023年度薪酬情况",
    "content": "公告详细内容...",
    "date": "2025-07-09",
    "publishTime": "2025-07-09T00:00:00Z",
    "createdAt": "2025-07-09T00:00:00Z",
    "link": "#",
    "status": 1
  }
}
```

## 错误响应格式

```json
{
  "code": 400,
  "message": "请求参数错误",
  "data": null
}
```

## 注意事项

1. 所有接口都需要返回统一的响应格式
2. 图片URL可以是相对路径或绝对路径
3. 日期格式建议使用ISO 8601标准
4. 前端组件已经做了容错处理，如果接口返回的数据字段名不同，会自动适配
5. 如果接口调用失败，会使用默认数据作为fallback
