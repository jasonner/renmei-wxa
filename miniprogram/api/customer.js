import http from '../utils/http.js'
import config from'../env/config.js'

const URL = config.customer_server_url

module.exports = {

  // //获取手机号
  // getPhoneNum: (params) => http.post(URL + '/tjnk/routine/login', { data: params, header: { 'content-type': 'application/json;charset=UTF-8' } }),

  // //获取用户步数
  // getRunStep: (params) => http.post(URL + '/tjnk/common/step', { data: params, header: { 'content-type': 'application/json;charset=UTF-8' }}),

  // //获取用户list
  // getList: (params) => http.get(URL + '/tjnk/common/stepList', { data: params }),

  //检测登录状态
  checkLogin:(params) => http.get(URL + '/onlineClassVx/checkCode', { data: params, header: { 'content-type': 'application/json;charset=UTF-8' } }),

  //手机号绑定
  bindLogin:(params) => http.get(URL + '/onlineClassVx/login', { data: params, header: { 'content-type': 'application/json;charset=UTF-8' } }),
  
  }