/**
 author: william   email:362661044@qq.com
 create_at:2022/7/7 下午 6:04
 **/
type callBack<V = any> = (e?: V) => void

/**
 * 订阅 & 发布通知
 * 可以有多个订阅，使用
 * **/
export class BaseChangeNotify<T> {
  private eventStacks = new Map()

  addListener(event: callBack<T>): void {
    if (!this.eventStacks.has(event)) {
      this.eventStacks.set(event, event)
    }
  }

  notification(e?: T): void {
    this.eventStacks.forEach((value) => {
      value(e)
    })
  }

  dispose() {
    this.eventStacks.clear()
  }

  removeListener(event: callBack<T>) {
    if (this.eventStacks.has(event)) {
      this.eventStacks.delete(event)
    }
  }
}
