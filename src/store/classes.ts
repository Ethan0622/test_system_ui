import { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { DeleteParams, GetParams, PostParams } from '@/utils/interface'

export const useClassStore = defineStore({
  id: 'classes',
  state: () => {
    return {
      classrooms: [],
    }
  },
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
