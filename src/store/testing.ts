import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { ItemObject, getParams, postParams } from '../utils/interface'

export default {
  testing: defineStore({
    id: 'testing',
    state: () => ({
      test_id: null,
      test_item: Object as () => ItemObject,
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
              this.test_item = res.data.first_item
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      getItemById({ urlParams, success, failure }: getParams) {
        httpMethods.get({
          url: `api/itembank/item_info/${urlParams}/`,
          permission: 'authentication',
          success: (res: any) => {
            success(res.data)
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      getTypeItems({ urlParams, success, failure }: getParams) {
        httpMethods.get({
          url: `api/itembank/item_type_list/${urlParams}/`,
          permission: 'authentication',
          success: (res: any) => {
            success(res.data)
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
    },
  }),
}
