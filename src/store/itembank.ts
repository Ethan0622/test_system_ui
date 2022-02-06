import axios, { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { useUserStore } from './user'
import { DeleteParams, PostParams, UploadParams } from '@/utils/interface'

export const useItemStore = defineStore({
  id: 'itembank',
  state: () => ({}),
  getters: {},
  actions: {
    createItem({ data, success, failure }: PostParams) {
      httpMethods.post({
        url: 'api/itembank/item_list/',
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
    updateItem({ urlParams, data, success, failure }: PostParams) {
      httpMethods.put({
        url: `api/itembank/item_info/${urlParams}/`,
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
    deleteItem({ urlParams, success, failure }: DeleteParams) {
      httpMethods.delete({
        url: `api/itembank/item_info/${urlParams}/`,
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
    uploadFile({ data, success, failure }: UploadParams) {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8001/api/itembank/upload_item_files/',
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
  },
})
