import { VueCookieNext } from 'vue-cookie-next'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { local } from './local'
import { getParams, postParams } from '@/utils/interface'
import { AxiosError, AxiosResponse } from 'axios'

export default {
  user: defineStore({
    id: 'user',
    state: () => ({
      userInfo: VueCookieNext.getCookie('userInfo'),
      unfinishTestInfo: local.get('unfinishTestInfo')
        ? JSON.parse(local.get('unfinishTestInfo') || '')
        : null,
    }),
    getters: {},
    actions: {
      register({ data, success, failure }: postParams) {
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

      logIn({ data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/users/user_login/',
          data,
          permission: 'allowAny',
          success: (res: AxiosResponse) => {
            if (res.status == 200) {
              VueCookieNext.setCookie('userInfo', res.data.userInfo)
              local.set('unfinishTestInfo', JSON.stringify(res.data.unfinishTestInfo))
              this.userInfo = res.data.userInfo
              this.unfinishTestInfo = res.data.unfinishTestInfo
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
        local.remove('unfinishTestInfo')
        local.remove('test_id')
        local.remove('test_item')
        this.userInfo = ''
        this.unfinishTestInfo = null
      },

      getUserInfo({ urlParams, success, failure }: getParams) {
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

      updateUserInfo({ urlParams, data, success, failure }: postParams) {
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

      checkTests({ success, failure }: getParams) {
        httpMethods.get({
          url: 'api/users/user_check_tests/',
          permission: 'authentication',
          success: (res: AxiosResponse) => {
            if (res.status == 200) {
              local.set('unfinishTestInfo', JSON.stringify(res.data))
              this.unfinishTestInfo = res.data
              success(res.data)
            }
          },
          failure: (error: AxiosError) => {
            failure(error)
          },
        })
      },

      getTestsList({ success, failure }: getParams) {
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
  }),
}
