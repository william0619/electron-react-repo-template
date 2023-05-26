/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 8:13 PM
 **/

import React from 'react'
import { OperateBtnBar } from './OperateBtnBar.tsx'
import { ClientUtils } from '../../utils/cilent.utils.ts'
import css from './index.module.scss'
import * as classNames from 'classnames'
export function WinBar() {
  const electron = ClientUtils.getClient()

  const win32 = electron?.isWin32()

  return (
    <>
      {electron && (
        <>
          {win32 ? (
            <div className={classNames(css.bar, css.winBar)}>
              <div className="logo"></div>
              <div className={css.right}>
                <OperateBtnBar />
              </div>
            </div>
          ) : (
            // mac os
            <div className={classNames(css.bar, css.macBar)}>other</div>
          )}
        </>
      )}
    </>
  )
}
