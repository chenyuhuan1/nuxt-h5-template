/*
 * @Author: chenyuhuan
 * @Date: 2020-07-08 18:15:55
 * @LastEditTime: 2020-09-03 18:04:01
 * @LastEditors: 陈宇环
 * @Description: 过滤器
 */

import Vue from 'vue'
import moment from 'moment'
// 时间格式化  fmt: YYYY-MM-DD HH:mm:ss
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(fmt)
}
const filters = {
  formatDate
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
