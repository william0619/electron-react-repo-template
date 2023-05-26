/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 7:57 PM
 **/

import React, { useEffect, useState } from 'react'
import { ClientUtils } from '../../utils/cilent.utils.ts'
import styled from 'styled-components'

const size = '32px'

const BtnBar = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 5px;
`
const Btn = styled.div`
  user-select: none;
  border-radius: 4px;
  display: grid;
  place-items: center;
  width: ${size};
  height: ${size};
  cursor: pointer;
  -webkit-app-region: none;
  font-size: 13px;
  color: #676767;
  transition: all 0.2s linear;
  &:hover {
    background-color: #eeeeee;
  }
`

export function OperateBtnBar() {
  const electron = ClientUtils.getClient()

  const [winSize, setWinSize] = useState<'unmaximize' | 'maximize'>('unmaximize')

  useEffect(() => {
    const destroy = electron?.ipcRenderer.on('changeMaximize', (args) => {
      const { state } = args
      setWinSize(state)
    })
    return () => {
      destroy?.()
    }
  }, [])

  const onMinimize = () => {
    electron?.ipcRenderer.send('minimize', { winName: ClientUtils.getWinName() })
  }

  const onChangeMaximize = () => {
    electron?.ipcRenderer.send('changeMaximize', { winName: ClientUtils.getWinName() })
  }

  const onShowdown = () => {
    electron?.ipcRenderer.send('shutdown', { winName: ClientUtils.getWinName() })
  }

  return (
    <BtnBar>
      <Btn className="iconfont" onClick={onMinimize}>
        &#xe65a;
      </Btn>
      <Btn className="iconfont" onClick={onChangeMaximize}>
        {winSize === 'unmaximize' ? <>&#xe65d;</> : <>&#xe692;</>}
      </Btn>
      <Btn className="iconfont" onClick={onShowdown}>
        &#xe660;
      </Btn>
    </BtnBar>
  )
}
