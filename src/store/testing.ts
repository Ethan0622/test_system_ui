import { defineStore } from 'pinia'
import { httpMethods } from '../api'

interface postParams {
  urlParams?: number | null
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
    id: 'testing',
    state: () => ({
      test_id: null,
    }),
    getters: {},
    actions: {
      startTest({ urlParams = null, data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/testing/test_info/',
          data,
          permission: 'authentication',
          success: (res: any) => {
            if (res.status == 201) {
              success(res.data)
              this.test_id = res.data.test_id
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
