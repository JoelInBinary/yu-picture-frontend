import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUserUsingGet } from '@/api/userController.ts'

/**
 * 存储登录用户信息的状态
 */
export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: '未登录',
  })

  /**
   * 调用后端接口，获取登录用户信息
   */
  async function fetchLoginUser(){
    const res = await getLoginUserUsingGet()
    if (res.data.code === 0 && res.data.data){
      loginUser.value = res.data.data
    }
    // 测试用户登录，3秒后自动登录
    // setTimeout(() => {
    //   loginUser.value = {
    //     userName: '测试用户',
    //     id: 1,
    //   }
    // }, 3000)
  }

  /**
   * 更新登录用户信息
   * @param newLoginUser
   */
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }

  return { loginUser, fetchLoginUser, setLoginUser }
})
