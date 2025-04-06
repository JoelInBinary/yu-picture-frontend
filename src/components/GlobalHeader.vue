<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img src="@/assets/logo.png" alt="logo" class="logo" />
            <div class="title">智能协同云图库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ loginUserStore.loginUser.userName ?? '无名' }}
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUserStore = useLoginUserStore();

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
])

const router = useRouter()
// 菜单点击事件-路由跳转
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  })
}

// 新增路由监听，更新当前菜单高亮状态
const current = ref<string[]>([])
const route = useRoute()
watch(
  () => route.path,
  (newPath) => {
    current.value = [newPath]
  },
  { immediate: true },
)
</script>

<style scoped>
#globalHeader .title-bar {
  display: flex;
}

.title {
  font-size: 18px;
  color: #444444;
  margin-left: 10px;
}

.logo {
  height: 36px;
  margin: 10px;
}
</style>
