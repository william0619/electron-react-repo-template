/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 6:28 PM
 **/
import loadable from '@loadable/component'
import { createHashRouter } from 'react-router-dom'

const Login = loadable(() => import('./modules/login/index.tsx'), {
  resolveComponent: (components) => components.Login
})

const Home = loadable(() => import('./modules/home/index.tsx'), {
  resolveComponent: (components) => components.Home
})

export const routers = createHashRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  { path: '*', element: <Login /> }
])
