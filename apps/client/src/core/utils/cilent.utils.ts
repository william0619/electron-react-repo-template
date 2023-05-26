/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 3:15 PM
 **/

import type { ElectronHandler } from '../../main/preload.ts'

export class ClientUtils {
  // 是否客户端
  static getClient(): ElectronHandler | null {
    return window.electron ?? null
  }

  static getWinName() {
    return window.winName ?? 'unknown'
  }
}
