/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 3:10 PM
 **/
import dayjs from 'dayjs'

class TimeGetter {
  private timeDiff = 0

  private serviceStamp = 0

  constructor() {
    // 每1hour校准一次时间
    setInterval(() => {
      this.calibrateTime()
    }, 1000 * 60 * 60)
  }

  private async calibrateTime() {
    const stamp = 0

    this.timeDiff = dayjs().unix() - stamp
    this.serviceStamp = stamp

    // console.log('时间校准', this.serviceStamp, this.timeDiff)

    return stamp
  }

  async getDate(): Promise<number> {
    if (this.serviceStamp) {
      return dayjs().unix() - this.timeDiff
    }

    try {
      return await this.calibrateTime()
    } catch (e) {
      console.error('获取时间戳失败', e)
      // 时间戳获取失败, 暂时读取客户端时间
      return dayjs().unix()
    }
  }

  getDateRoughly(): number {
    if (this.serviceStamp) {
      return dayjs().unix() - this.timeDiff
    }

    return dayjs().unix()
  }
}

export default new TimeGetter()
