import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 存储登录用户信息的状态
 */
export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<any>({
    userName: '未登录',
  })

  /**
   * 调用后端接口，获取登录用户信息
   */
  async function fetchLoginUser(){
    // todo: 由于后端还没提供接口，暂时注释

    // 测试用户登录，3秒后自动登录
    setTimeout(() => {
      loginUser.value = {
        userName: '测试用户',
        id: 1,
      }
    }, 3000)
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
