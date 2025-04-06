<template>
  <div class="box">
    <div ref="vantaRef" style="width: 100%; height: 75vh; position: relative">
      <div id="userLoginPage">
        <h2 class="title">智能协同云图库 - 用户注册</h2>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="handleSubmit">
          <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
            <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
          </a-form-item>
          <a-form-item
            name="userPassword"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 8, message: '密码不能小于 8 位' },
            ]"
          >
            <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item
            name="checkPassword"
            :rules="[
              { required: true, message: '请输入确认密码' },
              { min: 8, message: '密码不能小于 8 位' },
            ]"
          >
            <a-input-password v-model:value="formState.checkPassword" placeholder="请输入确认密码" />
          </a-form-item>
          <div class="tips">
            已有账号？
            <RouterLink to="/user/login">去登录</RouterLink>
          </div>
          <a-form-item>
            <a-button type="primary" html-type="submit" style="width: 100%">注册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLoginUsingPost, userRegisterUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import * as THREE from 'three'
import NET from 'vanta/src/vanta.net'

const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const router = useRouter()
const loginUserStore = useLoginUserStore()

const vantaRef = ref(null)
let vantaEffect: any = null

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  if (values.userPassword !== values.checkPassword) {
    message.error('两次输入的密码不一致')
    return
  }
  const res = await userRegisterUsingPost(values)
  // 注册成功，跳转到登录页面
  if (res.data.code === 0 && res.data.data) {
    message.success('注册成功')
    router.replace({
      path: '/user/login',
    })
  } else {
    message.error('注册失败，' + res.data.message)
  }
}

onMounted(() => {
  vantaEffect = NET({
    el: vantaRef.value,
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 0.5,
    color: 0xc7d1e8,
    backgroundColor: 0xf0f0f0,
    points: 13.0,
    maxDistance: 21.0,
    spacing: 16.0,
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<style scoped>
.box {
  position: relative;
  height: 75vh;
}

#userLoginPage {
  max-width: 360px;
  margin: 0 auto;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
}

.tips {
  margin-bottom: 16px;
  color: #bbb;
  font-size: 14px;
  text-align: right;
}

/* 适应移动端，增加响应式的字体大小 */
@media (max-width: 600px) {
  #userLoginPage {
    width: 90%; /* 在小屏幕下占 90% 宽度 */
  }

  .title {
    font-size: 18px; /* 调整标题字体大小 */
  }

  .tips {
    font-size: 12px; /* 调整提示文字大小 */
  }
}
</style>
