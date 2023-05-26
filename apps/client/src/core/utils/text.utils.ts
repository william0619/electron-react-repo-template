
type IFontStyle = any



/**
 author: william   email:362661044@qq.com
 create_at:2022/8/26 14:38
 **/

export class TextUtils {
  /**
   * 计算字体宽度
   * **/
  static getFontWidth(txt: string, font: IFontStyle) {
    const canvas = document.createElement('canvas')
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    if (font) {
      const _fontStyle = `${font?.fontWeight} ${font?.fontSize} ${font?.fontFamily}`
      ctx!.font = _fontStyle
    }

    if (font?.letterSpacing) {
      canvas.style.letterSpacing = font.letterSpacing as string
    }

    return ctx!.measureText(txt).width ?? 0
  }

  /**
   * 文本是否溢出
   * **/
  static isTextOverflow(target: HTMLElement) {
    const domWidth = target.offsetWidth
    const text = target.innerText
    const _style = window.getComputedStyle(target)
    const fontWidth = Math.round(TextUtils.getFontWidth(text, _style))
    return fontWidth > domWidth
  }
}
