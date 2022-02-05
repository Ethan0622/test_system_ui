import axios from 'axios'
import { baseUrl } from './baseUrl'
import userStores from '../store/user'

export const httpMethods = {
  get({ url, params, permission, success, failure }: any) {
    let axiosRequest
    if (permission == 'allowAny') {
      axiosRequest = axios({
        method: 'GET',
        url: baseUrl + url,
        params,
      })
    } else {
      axiosRequest = axios({
        method: 'GET',
        url: baseUrl + url,
        params,
        headers: { Authorization: 'Bearer ' + userStores.user().userInfo.token },
      })
    }
    axiosRequest
      .then((res) => {
        success(res)
      })
      .catch((error) => {
        failure(error)
      })
  },

  post({ url, data, permission, success, failure }: any) {
    let axiosRequest
    if (permission == 'allowAny') {
      axiosRequest = axios({
        method: 'POST',
        url: baseUrl + url,
        data,
      })
    } else {
      axiosRequest = axios({
        method: 'POST',
        url: baseUrl + url,
        headers: { Authorization: 'Bearer ' + userStores.user().userInfo.token },
        data,
      })
    }
    axiosRequest
      .then((res) => {
        success(res)
      })
      .catch((error) => {
        failure(error)
      })
  },

  put({ url, data, permission, success, failure }: any) {
    let axiosRequest
    if (permission == 'allowAny') {
      axiosRequest = axios({
        method: 'PUT',
        url: baseUrl + url,
        data,
      })
    } else {
      axiosRequest = axios({
        method: 'PUT',
        url: baseUrl + url,
        headers: { Authorization: 'Bearer ' + userStores.user().userInfo.token },
        data,
      })
    }
    axiosRequest
      .then((res) => {
        success(res)
      })
      .catch((error) => {
        failure(error)
      })
  },

  delete({ url, data, permission, success, failure }: any) {
    let axiosRequest
    if (permission == 'allowAny') {
      axiosRequest = axios({
        method: 'DELETE',
        url: baseUrl + url,
        data,
      })
    } else {
      axiosRequest = axios({
        method: 'DELETE',
        url: baseUrl + url,
        headers: { Authorization: 'Bearer ' + userStores.user().userInfo.token },
        data,
      })
    }
    axiosRequest
      .then((res) => {
        success(res)
      })
      .catch((error) => {
        failure(error)
      })
  },
}
