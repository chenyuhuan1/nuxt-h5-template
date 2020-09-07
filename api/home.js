import { axios } from './index'
export function getBannerList(parameter) {
  return axios({
    url: '/banner/rotate',
    method: 'get',
    params: parameter
  })
}
