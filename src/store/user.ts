import { VueCookieNext } from 'vue-cookie-next'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { GetParams, PostParams } from '@/utils/interface'
import { AxiosError, AxiosResponse } from 'axios'
import { UnfinishedTest } from '@/utils/interface'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: VueCookieNext.getCookie('userInfo'),
    unfinishedTest: {} as UnfinishedTest,
  }),
  persist: { enabled: true, strategies: [{ paths: ['unfinishedTest'] }] },
  getters: {},
  actions: {
    register({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/users/user_list/',
        data,
        permission: 'allowAny',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            this.userInfo = res.data
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },

    logIn({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/users/user_login/',
        data,
        permission: 'allowAny',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            VueCookieNext.setCookie('userInfo', res.data.userInfo)
            this.userInfo = res.data.userInfo
            this.unfinishedTest = res.data.unfinishTest
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },

    logOut() {
      VueCookieNext.removeCookie('userInfo')
      window.sessionStorage.clear()
    },

    getUserInfo({ urlParams, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/users/user_detail/${urlParams}/`,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },

    updateUserInfo({ urlParams, data, success, failure }: PostParams) {
      httpMethods.put({
        url: `api/users/user_detail/${urlParams}/`,
        data,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },

    checkTests({ success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/users/user_check_tests/',
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            this.unfinishedTest = res.data
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },

    getTestsList({ success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/users/user_tests_list/',
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
  },
})
