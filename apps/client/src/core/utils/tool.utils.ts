/**
 author: william   email:362661044@qq.com
 create_at:2022/12/2 6:35 PM
 **/

type IMemoMatch<T extends object> = {
  prevProps: T
  nextProps: T
  match: Array<keyof T>
}

export class ToolUtils {
  static memoMatch<T extends object>(args: IMemoMatch<T>) {
    const { prevProps, nextProps, match } = args
    return match.every((key) => {
      return prevProps[key] === nextProps[key]
    })
  }
}
