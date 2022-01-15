import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { local } from './local'
import { ItemObject, getParams, postParams } from '../utils/interface'

export default {
  testing: defineStore({
    id: 'testing',
    state: () => ({
      test_id: Number(local.get('test_id')),
      test_item: local.get('test_item') ? JSON.parse(local.get('test_item') || '') : null,
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
              local.set('test_id', JSON.stringify(res.data.testInfo.test_id))
              local.set('test_item', JSON.stringify(res.data.first_item))
              this.test_id = res.data.testInfo.test_id
              this.test_item = res.data.first_item
              success(res.data)
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      continueTest({ urlParams = null, data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/testing/test_continue/',
          data,
          permission: 'authentication',
          success: (res: any) => {
            if (res.status == 200) {
              if (res.data.next_item) {
                local.set('test_item', JSON.stringify(res.data.next_item))
                this.test_item = res.data.next_item
                success(res.data)
              } else {
                success(res.data)
              }
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      continueInitTest({ params, success, failure }: getParams) {
        httpMethods.get({
          url: 'api/testing/init_test_process/',
          params,
          permission: 'authentication',
          success: (res: any) => {
            if (res.status == 200) {
              local.set('test_item', JSON.stringify(res.data.next_item))
              this.test_item = res.data.next_item
              success(res.data)
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      submitInitAnswer({ urlParams = null, data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/testing/init_test_process/',
          data,
          permission: 'authentication',
          success: (res: any) => {
            if (res.status == 201) {
              if (res.data.next_item) {
                local.set('test_item', JSON.stringify(res.data.next_item))
                this.test_item = res.data.next_item
                success(res.data)
              } else {
                success(res.data)
              }
            }
          },
          failure: (error: any) => {
            failure(error)
          },
        })
      },
      submitAnswer({ urlParams = null, data, success, failure }: postParams) {
        httpMethods.post({
          url: 'api/testing/object_test_process/',
          data,
          permission: 'authentication',
          success: (res: any) => {
            if (res.status == 201) {
              local.set('test_item', JSON.stringify(res.data.next_item))
              this.test_item = res.data.next_item
              success(res.data)
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
