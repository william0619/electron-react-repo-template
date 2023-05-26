import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { WinBar } from './components/winBar/WinBar.tsx'
import { routers } from './routers.tsx'
import { useMount } from 'ahooks'
import { ClientUtils } from './utils/cilent.utils.ts'
import './App.css'

function App() {
  useMount(() => {
    const ele = ClientUtils.getClient()
    if (ele) {
      ele.ipcRenderer.once('setWinName', (name) => {
        window.winName = name
      })
    }
  })

  return (
    <div id="app">
      <WinBar />
      <RouterProvider router={routers}></RouterProvider>
    </div>
  )
}

export default App
