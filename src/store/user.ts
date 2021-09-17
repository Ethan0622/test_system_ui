import { VueCookieNext } from 'vue-cookie-next'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'

interface postParams {
  urlParams?: number
  data: Record<string, unknown>
  success: any
  failure: any
}

interface getParams {
  urlParams?: number 
  success: any
  failure: any
}

export default {
  user: defineStore({
    id: 'user',
    state: () => ({
      userInfo: VueCookieNext.getCookie('userInfo'),
    }),
    getters: {},
    actions: {
      register({ urlParams, data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/users/user_list/',
          data,
          permission: 'allowAny',
          success: (res: any) => {
            if (res.status == 200) {
              this.userInfo = res.data
              success(res.data)
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      logIn({urlParams, data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/users/user_login/',
          data,
          permission: 'allowAny',
          success: (res: any) => {
            if (res.status == 200) {
              VueCookieNext.setCookie('userInfo', res.data)
              this.userInfo = res.data
              success(res.data)
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      logOut() {
        VueCookieNext.removeCookie('userInfo')
        this.userInfo = ''
      },
      getUserInfo({ urlParams, success, failure }: getParams) {
        httpMethods.get({
          url:`api/users/user_detail/${urlParams}`,
          permission: 'authentication',
          success: (res: any) => {
            if (res.status == 200) {
              success(res.data)
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
    },
  }),
}
