/*
 * @Author: chenyuhuan
 * @Date: 2020-07-09 15:29:42
 * @LastEditTime: 2020-09-03 10:15:17
 * @LastEditors: 陈宇环
 * @Description:  localStorage的方法
 *                api：https://github.com/marcuswestin/store.js/
                  storage.set('user', { name:'Marcus' })
                  storage.get('user')
                  storage.remove('user')
                  storage.clearAll()
                  设置过期时间：
                  storage.set('foo', 'bar', new Date().getTime() + 3000)
 */
const engine = require('store/src/store-engine')
const storages = [require('store/storages/localStorage')]
const plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
]
const store = engine.createStore(storages, plugins)

export default store
