import { defineStore } from 'pinia'
import { removeToken, toLogin } from '@/utils'
import { usePermissionStore, useTabStore } from '@/store'
import { resetRouter } from '@/router'
import api from '@/api'

interface UserInfo {
  id?:string,
  userName?: string
  realName?: string
  role?: Array<string>
  avatar?: string
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo> {},
    }
  },
  getters: {
    userId(): string {
      return this.userInfo.id || ''
    },
    userName(): string {
      return this.userInfo.userName || ''
    },
    realName(): string {
      return this.userInfo.realName || ''
    },

    role(): Array<string> {
      return this.userInfo.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res: any = await api.getUser()
        if (res.code == 200) {
          const { id, userName, realName, role, avatar } = res.data
          this.userInfo = { id, userName, realName, role, avatar }
          return Promise.resolve(res.data)
        }
        else {
          return Promise.reject(res)
        }
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      const { resetTabs } = useTabStore()
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetPermission()
      resetTabs()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
