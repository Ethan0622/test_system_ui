import { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { deleteParams, getParams, postParams } from '@/utils/interface'

export default {
  classes: defineStore({
    id: 'classes',
    state: () => {
      return {
        classrooms: [],
      }
    },
    getters: {},
    actions: {
      getClasses({ success, failure }: getParams) {
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
      createClass({ data, success, failure }: postParams) {
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
      deleteClass({ urlParams, success, failure }: deleteParams) {
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
      getClassStudents({ urlParams, success, failure }: getParams) {
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
      updateStudentInfo({ urlParams, data, success, failure }: postParams) {
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
      removeStudent({ urlParams, data, success, failure }: postParams) {
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
      joinClass({ data, success, failure }: postParams) {
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
      getJoinedClass({ success, failure }: getParams) {
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
      quitClass({ success, failure }: deleteParams) {
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
  }),
}
