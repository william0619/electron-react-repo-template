/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 4:52 PM
 **/

import React from 'react'
import css from './index.module.scss'
import { Button } from '@arco-design/web-react'
export function Login() {
  return (
    <div className="container flex">
      <div className={css.wrap}>
        <Button type="primary">Submit</Button>
        <div className="container">xx</div>
      </div>
    </div>
  )
}
