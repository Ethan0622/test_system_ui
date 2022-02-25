import axios, { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { useUserStore } from './user'
import {
  DeleteParams,
  GetParams,
  PostParams,
  TestInfoObject,
  UploadParams,
  UserObject,
} from '@/utils/interface'
import { baseUrl } from '../api/baseUrl'

export const useClassStore = defineStore({
  id: 'classes',
  state: () => {
    return {
      classrooms: [],
      currentStudent: {} as UserObject,
      currentTest: {} as TestInfoObject,
    }
  },
  persist: { enabled: true, strategies: [{ paths: ['currentStudent', 'currentTest'] }] },
  getters: {},
  actions: {
    getClasses({ success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/classes/class_list/',
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 200) {
            this.classrooms = res.data
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    createClass({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/classes/class_list/',
        data,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 201) {
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    deleteClass({ urlParams, success, failure }: DeleteParams) {
      httpMethods.delete({
        url: `api/classes/class_detail/${urlParams}/`,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 204) {
            success(res.data)
          }
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    getClassStudents({ urlParams, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/classes/class_student/${urlParams}/`,
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
    uploadStudentFile({ urlParams, data, success, failure }: UploadParams) {
      axios({
        method: 'POST',
        url: baseUrl + `api/classes/class_student/${urlParams}/`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + useUserStore().userInfo.token,
        },
        data,
      })
        .then((res: AxiosResponse) => {
          if (res.status == 200) {
            success(res.data)
          }
        })
        .catch((error: AxiosError) => {
          failure(error.response?.data)
        })
    },
    updateStudentInfo({ urlParams, data, success, failure }: PostParams) {
      httpMethods.put({
        url: `api/classes/class_student/${urlParams}`,
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
    removeStudent({ urlParams, data, success, failure }: PostParams) {
      httpMethods.delete({
        url: `api/classes/class_student/${urlParams}`,
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
    getStudentTests({ urlParams, params, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/classes/class_detail/${urlParams}/`,
        params,
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
    getSubjectAnswer({ urlParams, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/classes/class_test/${urlParams}/`,
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
    gradeSubjectItem({ urlParams, data, success, failure }: PostParams) {
      httpMethods.post({
        url: `api/classes/class_test/${urlParams}/`,
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
    joinClass({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/classes/class_info/',
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
    getJoinedClass({ success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/classes/class_info/',
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
    quitClass({ success, failure }: DeleteParams) {
      httpMethods.delete({
        url: 'api/classes/class_info/',
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          if (res.status == 204) {
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
