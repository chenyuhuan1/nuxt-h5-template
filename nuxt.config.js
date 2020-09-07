// eslint-disable-next-line nuxt/no-cjs-in-config
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        innerHTML: `
        !(function(e) {
          var t,
            n = document,
            i = window,
            o = n.documentElement
          function u() {
            var t = (o.getBoundingClientRect().width / e) * 100
            // o.style.fontSize = Math.min(t, 102.4) + 'px'
            o.style.fontSize = t + 'px'
          }
          u(),
            i.addEventListener(
              'resize',
              function() {
                clearTimeout(t), (t = setTimeout(u, 300))
              },
              !1
            ),
            i.addEventListener(
              'pageshow',
              function(e) {
                e.persisted && (clearTimeout(t), (t = setTimeout(u, 300)))
              },
              !1
            )
        })(375)
      `,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/reset.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '@/plugins/vant-ui', ssr: true },
    { src: '@/api/index', ssr: true },
    { src: '~/plugins/filters', ssr: true },
    { src: '~/plugins/directives', ssr: true },
    { src: '~/plugins/main', ssr: false }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: [
      './assets/css/const.less' // 全局 less 变量
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        'postcss-plugin-px2rem': {
          rootValue: 100
          // minPixelValue: 2
          // exclude: /(node_module)/
        }
      }
    },
    transpile: [/vant.*?less/],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            style: (name) => {
              return `${name}/style/less.js`
            }
          },
          'vant'
        ]
      ]
    },
    // 打包分析
    analyze: true,
    // moment按需引入
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['zh-CN']
      })
    ]
  }
}
