/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 10:54 AM
 **/
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import qs from 'qs'
import { Domain, DomainAdmin, HttpMethod } from './const.ts'

export type IRequest<T = any> = {
  url: string
  data?: T
  signal: AxiosRequestConfig['signal']
}

export type IResponse<T = any> = {
  code: number
  message: string
  data: T
}

type IRequestConfig = {
  method: HttpMethod
} & Omit<AxiosRequestConfig, 'baseURL' | 'headers'>

type IParams = {
  version: string
  damian: Domain | DomainAdmin
  baseConfig?: CreateAxiosDefaults
}

export class Http {
  protected domain: string // 域名

  protected version: string // 版本号

  protected axios: AxiosInstance // http 请求实例

  get baseURL() {
    return `https://${this.domain}/${this.version}`
  }

  constructor(params: IParams) {
    const _baseConfig: CreateAxiosDefaults = {
      responseType: 'json',
      timeout: 15000
    }
    const { baseConfig = _baseConfig, damian, version } = params
    this.domain = damian
    this.version = version

    // 初始化实例
    this.axios = axios.create({ ...baseConfig, baseURL: this.baseURL })
    // 请求拦截器
    this.axios.interceptors.request.use(this.beforeRequest.bind(this))

    // 响应拦截器
    this.axios.interceptors.response.use(
      (res: AxiosResponse<IResponse>) => {
        return res
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // 请求前 根据environment来修改域名
  // 请求前头部带上
  private beforeRequest(request: InternalAxiosRequestConfig<any>) {
    // token
    this.axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

    if (request.url && process.env.NODE_ENV === 'production') {
      const query = request.params ? `?${qs.stringify(request.params)}` : ''

      // todo 加时间戳 防止缓存
      request.url = this.signUrl(`${request.url}${query}`)
      // delete request.params
    }

    // if (!request.headers) {
    //   request.headers
    // }

    // request.headers.Authorization = USER_TOKEN

    return request
  }

  // 添加时间
  private signUrl(url: string) {
    return url
  }

  /**
   *  todo 核心发送请求
   * 1、cancel token
   * 2、请求缓存
   * **/
  async send<T>(ags: IRequestConfig): Promise<any> {
    try {
      const res = await this.axios.request<IResponse<T>>({ ...ags })
      return res.data
    } catch (e) {
      return e
    }
  }

  get<D>(params: IRequest): Promise<IResponse<D>> {
    return this.send({ url: params.url, method: HttpMethod.get, params: params.data })
  }

  post<D>(params: IRequest): Promise<IResponse<D>> {
    return this.send({ url: params.url, method: HttpMethod.post, data: params.data })
  }

  patch<D>(params: IRequest): Promise<IResponse<D>> {
    return this.send({ url: params.url, method: HttpMethod.patch, data: params.data })
  }

  put<D>(params: IRequest): Promise<IResponse<D>> {
    return this.send({ url: params.url, method: HttpMethod.put, data: params.data })
  }

  delete<D>(params: IRequest): Promise<IResponse<D>> {
    return this.send({ url: params.url, method: HttpMethod.delete, data: params.data })
  }
}
