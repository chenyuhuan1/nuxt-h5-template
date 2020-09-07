// client端的axios
import AXIOS from 'axios'
import cookies from 'js-cookie'

// import { baseURL } from '@/config'
const baseURL = 'http://43.247.90.63/index.php/h5/v1'

const axios = AXIOS.create({
  baseURL
})

export default function(context) {
  // 请求时的拦截器
  axios.interceptors.request.use(
    (config) => {
      const token = cookies.get('token')
      // 客户端token
      if (token) {
        config.headers.token = token
      }
      // 服务端token
      const cookie = context.req ? context.req.headers.cookie : ''
      if (cookie) {
        config.headers.token = getStrToken(cookie)
      }
      return config
    },
    (error) => {
      console.warn('axios request', error)
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    (response) => {
      // 需要重新登录
      const needLoginCode = [300]
      if (needLoginCode.includes(response.data.code)) {
        // 清除用户信息
        context.store.commit('SETTOKEN', '')
        cookies.remove('token')
      }
      return response.data
    },
    (error) => {
      console.warn('axios response', error, error.response)
      return Promise.reject(error)
    }
  )
}

// const httpServer = (opts, data) => {
//   // http默认配置
//   const commonOpts = {}
//   const options = merge({}, commonOpts, opts)
//   if (options.method === 'get') {
//     options.params = data
//   } else if (
//     options.headers &&
//     /application\/json/.test(options.headers['content-type'] || '')
//   ) {
//     options.data = data
//   } else {
//     options.data = qs.stringify(data)
//   }

//   return axios(options)
// }

// export default httpServer

/**
 * @description: 获取类似subdomain=hunan; token=85e28911c28ff0d6c6070e85bd75388622eb500f 串中的token
 * @param str {string} 总字符串
 * @return  token {string} token
 */
function getStrToken(str) {
  const cookieArr = str.split(';')
  let serveToken = ''
  // 获取token
  for (const k in cookieArr) {
    const cookieItemStr = cookieArr[k]
    const cookieKeyAndValue = cookieItemStr.split('=')
    if (cookieKeyAndValue[0].includes('token')) {
      serveToken = cookieKeyAndValue[1]
    }
  }
  return serveToken
}

export { axios }
