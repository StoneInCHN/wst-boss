var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

//"http://47.106.214.141:10002/wst-boss/";//测试环境 IP
//"http://stone.yeager.vip/wst-boss/";//测试环境 域名

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL:'"http://stone.yeager.vip/wst-boss"'//测试环境
})