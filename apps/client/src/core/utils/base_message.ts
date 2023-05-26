/**
 author: william   email:362661044@qq.com
 create_at:2022/3/9 上午 10:33
 **/
// import { nanoid } from 'nanoid';

type callBack<T = any> = (e?: T) => void | any
/**
 * BaseMessage
 * 说明：
 *      1、发布订阅模式实体类，发布者可以接收到订阅者返回的信息。
 *      2、使用key来维护每个发布者和订阅者的channel。
 * **/
export class BaseMessage<k extends string> {
  // 事件池
  private eventStacks: Map<k, callBack[]> = new Map()

  // 添加事件
  private pushEvent(key: k, event: callBack) {
    const isExist = this.eventStacks.has(key)

    if (isExist) {
      this.eventStacks.get(key)!.push(event)
    } else {
      this.eventStacks.set(key, [event])
    }
  }

  // 监听事件
  addListener(key: k, event: callBack): void {
    this.pushEvent(key, event)
  }

  // 监听事件没有key
  // addListenerNotKey(event: callBack): string {
  //   const key: string = nanoid(10);
  //
  //   this.pushEvent(key as any, event);
  //   return key;
  // }

  // 执行事件
  private executeEvent(events: callBack[], data?: any): Array<any> {
    const returnedArr = []

    if (events) {
      for (const event of events) {
        // 获取监听的返回值
        const returned = event(data)

        if (returned) returnedArr.push(returned)
      }
    }
    return returnedArr
  }

  // 向某类型发布消息，能接受订阅者消息
  notification(key: k, e?: any): Promise<Array<any>> {
    return new Promise((resolve) => {
      // 事件循环
      const events = this.eventStacks.get(key) ?? []

      // 返回的消息
      resolve(this.executeEvent(events, e))
    })
  }

  // 向所有事件发布消息，能接受订阅者消息
  notificationAll(e?: any): Promise<Array<any>> {
    return new Promise((resolve) => {
      // 事件循环
      const events = Array.from(this.eventStacks.values()).flat()

      // 返回的消息
      resolve(this.executeEvent(events, e))
    })
  }

  removeEvent(key: k) {
    this.eventStacks.delete(key)
  }

  dispose() {
    this.eventStacks.clear()
  }
}
