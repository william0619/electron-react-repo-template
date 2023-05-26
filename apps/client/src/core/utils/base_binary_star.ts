/**
 author: william   email:362661044@qq.com
 create_at:2022-06-20 上午 10:58
 **/

// eslint-disable-next-line max-classes-per-file
type StarType<OBJ, K extends keyof OBJ> = {
  eventName: K
  message: OBJ[K]
}

type StarEventType<OBJ, K extends keyof OBJ> = {
  eventName: K
  getMsg: Star<OBJ, OBJ>['getMsg']
}

interface DynamicObj<T = any> {
  [keys: string]: T
}

export type IStar<P1, P2> = Star<P1, P2>

class Star<P1, P2> {
  private port: MessagePort

  constructor(p: MessagePort) {
    this.port = p
  }

  message = new Map<keyof P1, P1[keyof P1]>()

  onMessage(e: (event: StarEventType<P1, keyof P1>) => void) {
    this.port.onmessage = (ev: MessageEvent) => {
      const { data } = ev

      this.message.set(data.eventName, data.message)

      e({ eventName: data.eventName, getMsg: this.getMsg.bind(this) })
    }
  }

  getMsg<K extends keyof P1>(k: K): P1[K] {
    return this.message.get(k) as P1[K]
  }

  onMessageError(e: (ev: MessageEvent) => void) {
    this.port.onmessageerror = e
  }

  close(): void {
    this.port.onmessage = null
    this.port.onmessageerror = null
    this.port.close()
  }

  postMessage<K extends keyof P2>(msg: StarType<P2, K>) {
    this.port.postMessage(msg)
  }
}

/**
 * 基于 MessageChannel 简约版 ts版本 封装
 * sun 是端口一
 * moon 是端口二
 * 泛型接受 2个, 都是对象。 对象的Key作为事件的Key 对应就是类型
 *
 * 使用场景：双方需要进行一个通信，但是接受的事件是不同的
 * **/
export class BaseBinaryStar<SUM extends DynamicObj, MOON extends DynamicObj> {
  // p1 端口, p1 发送消息 p2 接受
  public sun: Star<SUM, MOON>

  // p2 端口， p2 发送消息 p1 接受
  public moon: Star<MOON, SUM>

  constructor() {
    const { port1, port2 } = new MessageChannel()

    this.sun = new Star<SUM, MOON>(port1)
    this.moon = new Star<MOON, SUM>(port2)
  }
}
/** DEMO **/
const binaryStar = new BaseBinaryStar<
  { a: string; b: number; abc: { kill: string } },
  { a1: string; b1: boolean; gg: { name: string; age: number } }
>()

binaryStar.sun.postMessage({ eventName: 'a1', message: 'true' })

binaryStar.moon.postMessage({ eventName: 'abc', message: { kill: 'ss' } })

binaryStar.sun.onMessage((event) => {
  switch (event.eventName) {
    case 'a':
      console.log(event.getMsg('a'))
      break
    case 'b':
      break
    case 'abc':
      break
    default:
  }
})

binaryStar.moon.onMessage((event) => {
  switch (event.eventName) {
    case 'a1':
      break
    case 'b1':
      break
    case 'gg':
      event.getMsg('gg')
      break
    default:
  }
})
