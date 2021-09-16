import { VueCookieNext } from 'vue-cookie-next'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'

interface postParams {
  url: string
  data: Record<string, unknown>
  success: any
  failure: any
}

interface getParams {
  url: string
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
      logIn({ url, data, success, failure }: postParams) {
        httpMethods.post({
          url,
          data,
          permission:'allowAny',
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
      getUserInfo({ url, success, failure }: getParams) {
        httpMethods.get({
          url,
          permission:'authentication',
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
