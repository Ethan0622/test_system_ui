import axios, { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { httpMethods } from '../api'
import { useUserStore } from './user'
import { DeleteParams, PostParams, UploadParams, GetParams } from '@/utils/interface'
import { baseUrl } from '../api/baseUrl'

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
    getTypeItems({ urlParams, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/itembank/item_type_list/${urlParams}/`,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          success(res.data)
        },
        failure: (error: AxiosError) => {
          failure(error)
        },
      })
    },
    getItemById({ urlParams, success, failure }: GetParams) {
      httpMethods.get({
        url: `api/itembank/item_info/${urlParams}/`,
        permission: 'authentication',
        success: (res: AxiosResponse) => {
          success(res.data)
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
    uploadItemFile({ data, success, failure }: UploadParams) {
      axios({
        method: 'POST',
        url: baseUrl + 'api/itembank/upload_item_files/',
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
    getItemSum({ success, failure }: GetParams) {
      httpMethods.get({
        url: 'api/itembank/item_list/',
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
