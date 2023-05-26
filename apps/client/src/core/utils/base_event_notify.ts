import { BaseChangeNotify } from './base_change_notify'

/**
 author: william   email:362661044@qq.com
 create_at:2022/11/3 7:44 PM
 **/

interface DynamicObj<T = any> {
  [keys: string]: T
}

type IEvent<OBJ, K extends keyof OBJ> = {
  event: K
  data: OBJ[K]
}

type callBack<V = any> = (e: V) => void

export class BaseEventNotify<OBJ extends DynamicObj> extends BaseChangeNotify<
  IEvent<OBJ, keyof OBJ>
> {
  private message = new Map<keyof OBJ, OBJ[keyof OBJ]>()

  getData<K extends keyof OBJ>(key: K) {
    return this.message.get(key) as OBJ[K]
  }

  addListener(event: callBack<IEvent<OBJ, keyof OBJ>>) {
    // @ts-ignore
    super.addListener(event)
  }

  notification<K extends keyof OBJ>(e: IEvent<OBJ, K>) {
    if (e) {
      this.message.set(e.event, e.data)
    }
    super.notification(e)
  }

  dispose() {
    this.message.clear()
    super.dispose()
  }
}
