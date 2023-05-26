/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 3:45 PM
 **/

export enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete'
}

// 正常用户
export enum Domain {
  dev = 'shadow-ai.zhitiands.net',
  test = 'shadow-ai.zhitiands.net',
  prod = 'shadow-ai.zhitiands.net'
}

// 管理后台
export enum DomainAdmin {
  dev = 'admin.zhitiands.net',
  test = 'admin.zhitiands.net',
  prod = 'admin.zhitiands.net'
}

export type ENV = 'dev' | 'test' | 'prod'
