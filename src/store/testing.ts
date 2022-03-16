import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { GetParams, PostParams } from '../utils/interface'
import { AxiosError, AxiosResponse } from 'axios'
import { ItemObject } from '../utils/interface'

export const useTestStore = defineStore({
  id: 'testing',
  state: () => ({
    testId: 0,
    testItem: {} as ItemObject,
    testFinish: false,
  }),
  persist: { enabled: true },
  getters: {},
  actions: {
    startTest({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/testing/test_info/',
        data,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 201) {
            this.testId = res.data.testInfo.test_id
            this.testItem = res.data.first_item
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    continueTest({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/testing/test_continue/',
        data,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            if (res.data.next_item) {
              this.testItem = res.data.next_item
              success(res.data)
            } else {
              success(res.data)
            }
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    continueInitTest({ params, success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/testing/init_test_process/',
        params,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            this.testItem = res.data.next_item
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    finishTest({ urlParams, data, success, failure }: PostParams) {
      httpMethods.post({
        url: `api/testing/test_finish/${urlParams}/`,
        data,
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            success(res)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    submitInitAnswer({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/testing/init_test_process/',
        data,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 201) {
            if (res.data.next_item) {
              this.testItem = res.data.next_item
              success(res.data)
            } else {
              success(res.data)
            }
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    submitAnswer({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/testing/object_test_process/',
        data,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 201) {
            this.testItem = res.data.next_item
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    getFirstObjectItem({ params, success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/testing/object_test_process/',
        params,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            this.testItem = res.data
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    getFirstSubjectItem({ params, success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/testing/subject_test_process/',
        params,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            this.testItem = res.data
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    submitSubjectAnswer({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/testing/subject_test_process/',
        data,
        success: (res: AxiosResponse) => {
          if (res.status == 201) {
            this.testItem = res.data.next_item
            this.testFinish = res.data.finishAllTest
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    getTestResult({ urlParams, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/testing/test_info_detail/${urlParams}`,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          success(res.data)
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
  },
})
