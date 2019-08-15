// 项目名称
var projectName = 'mtd'
// 后台服务地址【所以请求带上"/api"前缀】
var serviceUrl = 'http://localhost:8080'

var shiroSid = null

// ------------以下默认配置一般情况不要修改------------//
const Alphabet = require('alphabetjs')
const str = Alphabet('360jr', 'planar')
console.log(str)

let glob = require('glob')
var fileValue = ''
var baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  fileValue = ''
  baseUrl = '/'
} else {
  fileValue = '../../views/'
  baseUrl = '../static/vue/'
}

let htmls = getEntry('./src/pages/**/main.js')
let mock = require('./mock/index.js')

// 配置end
module.exports = {
  pages: htmls,
  outputDir: '../' + projectName + '-web/src/main/webapp/static/vue/',
  publicPath: baseUrl,
  devServer: {
    index: 'index.html',
    open: process.platform === 'darwin',
    host: '',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: 'http://mktcms-web-uat.daikuan.qihoo.net',
    // proxy: {
    //   '/api': {
    //     target: serviceUrl,
    //     changeOrigin: true,
    //     pathRewrite: function (path, req) {
    //       if (shiroSid !== null) {
    //         return path + '?shiro_sid=' + shiroSid
    //       } else {
    //         return path
    //       }
    //     }
    //   },
    //   '/clio/common/': {
    //     target: serviceUrl,
    //     changeOrigin: true,
    //     pathRewrite: function (path, req) {
    //       if (shiroSid !== null) {
    //         return path + '?shiro_sid=' + shiroSid
    //       } else {
    //         return path
    //       }
    //     }
    //   }
    // },
    before: app => {
      app.get('/htmls', (req, res) => {
        res.json({
          errno: 0,
          data: htmls
        })
      })
      // 启用mock
      mock.init(app)
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 10000
        return options
      })
  }
}
function getEntry (globPath) {
  let entries = {}
  let tmp
  glob.sync(globPath).forEach(function (entry) {
    tmp = entry.split('/').splice(-3)
    console.log('加载应用：' + tmp[1])

    entries[tmp[1]] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
      template: 'src/common/index.html',
      filename: fileValue + tmp[1] + '.html'
    }
  })
  return entries
}
