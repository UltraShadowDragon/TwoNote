import Inspect from 'vite-plugin-inspect'
import { resolve } from 'path'

export default {
  plugins: [
    Inspect()
  ],
  build: {
    rollupOptions: {
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
        login: new URL('./login/index.html', import.meta.url).pathname,
        notebook: new URL('./notebook/index.html', import.meta.url).pathname
      }
    }
  },
  resolve: {
    // alias: {
    //   '@': resolve(__dirname, './src/assets')
    // }
  }
}