import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import zhCN from 'ant-design-vue/es/locale/zh_CN'; // 引入中文语言包
import { ConfigProvider } from 'ant-design-vue'; // 引入 ConfigProvider 组件
import "@/access.ts" // 引入权限控制文件

const app = createApp(App)

// 配置 ant-design-vue 的国际化
app.use(ConfigProvider, {
  locale: zhCN,
});

const pinia = createPinia()

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(pinia)

app.mount('#app')
