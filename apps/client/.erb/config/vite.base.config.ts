import * as path from 'path'
import vitePaths from './vite.paths'
import react from '@vitejs/plugin-react-swc'
import { vitePluginForArco } from '@arco-plugins/vite-react'

const plugins: any[] = [react(), vitePluginForArco()]

const alias = {
  '@': path.resolve(vitePaths.srcPath)
}

export { plugins, alias }
