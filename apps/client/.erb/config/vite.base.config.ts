import * as path from 'path'
import vitePaths from './vite.paths'
import react from "@vitejs/plugin-react-swc";


const plugins = [
  react()
]

const alias = {
  '@': path.resolve(vitePaths.srcPath)
}

export { plugins, alias }
