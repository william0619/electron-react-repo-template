/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 11:06 AM
 **/

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
import { ElectronHandler } from './main/preload'
import type { Component } from 'vue'

declare module '*.json' {
  const value: any
  export default value
}

declare global {
  interface Window {
    winName?: string
    electron?: ElectronHandler
  }
}
