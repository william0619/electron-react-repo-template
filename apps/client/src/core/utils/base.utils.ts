export interface dynamicObj<T = any> {
  [keys: string]: T
}

export default class BaseUtil {
  /** 获取url参数 **/
  static getQueryString = () => {
    const data: { [propName: string]: any } = {}
    const src: string = window.location.href
    const index: number = src.indexOf('?')

    if (index === -1) {
      return data
    }
    const dataStr = src.substring(src.indexOf('?') + 1)
    const dataArray = dataStr.split('&')

    for (let i = 0; i < dataArray.length; i++) {
      const param = dataArray[i].split('=')

      // eslint-disable-next-line prefer-destructuring
      data[param[0]] = param[1]
    }
    return data
  }

  /** 时间节流 **/
  static throttle = (fn: () => void, delay = 300) => {
    let last = 0

    return () => {
      const now = Date.now()

      if (now > last + delay) {
        fn()
        last = now
      }
    }
  }

  /**
   * 功能: 当前dom，沿着dom树找到最近属性，并返回改属性的值。
   * 场景：事件委托绑定 向上递归
   * **/
  static eventDelegation(args: {
    attribute: string
    event: Event
    stopPropagation?: boolean
  }): string | null {
    const { attribute, event, stopPropagation = true } = args

    stopPropagation && event.stopPropagation()
    const arr: EventTarget[] = event.composedPath()
    let data

    for (let i = 0; i < arr.length; i++) {
      const dom = arr[i] as HTMLDivElement

      try {
        data = dom.getAttribute(attribute)
        if (data) break
      } catch (e) {
        data = null
        break
      }
    }
    return data ?? null
  }

  /** 判断空对象 **/
  static isEmptyObj(obj: any): boolean {
    try {
      if (obj !== null) {
        // 判断基本类型
        if (typeof obj === 'number') return false
        if (typeof obj === 'string') return false
        // 引用类型
        if (obj instanceof Array) return obj.length === 0
        return Object.keys(obj).length === 0
      }
      return true
    } catch (e) {
      return true
    }
  }

  /**
   * 把 带参数 url 格式字符串转换格式
   * path： /list/detail/{id}/{name}
   * params：{id:'123',name:'william'}
   * result: /list/detail/{id} ===> /list/detail/123/william
   * **/
  static urlParamsMerge(path: string, params: dynamicObj) {
    const reg = /\{[a-z_]+\}/g
    const mark = '{}'
    return BaseUtil.paramsMerge(path, params, { reg, mark })
  }

  /**
   * 把 带参数 url 格式字符串转换格式
   * path： /list/detail/:id/:name
   * params：{id:'123',name:'william'}
   * result: /list/detail/{id} ===> /list/detail/123/william
   * **/
  static routeParamsMerge(path: string, params: dynamicObj) {
    const reg = /:[a-z_]+/g
    const mark = ':'
    return BaseUtil.paramsMerge(path, params, { reg, mark })
  }

  /**
   * 功能：对字符串进行替换
   * 主要提供给 urlParamsMerge 和 routeParamsMerge 使用
   * **/
  static paramsMerge(
    path: string,
    params: dynamicObj,
    { reg, mark }: { reg: RegExp; mark: string }
  ) {
    // eslint-disable-next-line prefer-regex-literals
    const pathParams = [...path.matchAll(reg)].map((i) => i[0])
    /** 替换参数 **/

    if (pathParams.length > 0) {
      for (const value of pathParams) {
        if (value) {
          let key: string = value.toString()

          for (const _mark of [...mark]) {
            key = key.replace(_mark, '')
          }
          if (key in params) {
            // eslint-disable-next-line no-param-reassign
            path = path.replace(value, params[key])
            delete params[key]
          }
        }
      }
    }
    return path
  }
}
