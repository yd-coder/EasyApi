import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/EasyApi/' : './',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src') // src 路径
		}
	},
	server: {
		port: 8080, // 开发环境启动的端口
		proxy: {
			'/api': {
				// 当遇到 /api 路径时，将其转换成 target 的值
				target: 'http://xx.xx.xx.xx:8080/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '') // 将 /api 重写为空
			}
		}
	}
})
