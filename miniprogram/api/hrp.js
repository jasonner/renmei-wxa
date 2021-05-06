import http from '../utils/http.js'
import config from'../env/config.js'

const URL = config.hrp_server_url
module.exports = {
    //获取栏目
    getColumn: (params) => http.get(URL + '/onlineClass/taxonList', { data: params, header: { 
      'content-type': 'application/json;charset=UTF-8'}}),

    //线上班列表
    getclassList: (params) => http.get(URL + '/onlineClass/classList', { data: params, header: { 
      'content-type': 'application/json;charset=UTF-8'}}),

    //获取视频详情列表
    getVideoList:(params) => http.get(URL + '/onlineClass/videoList', { data: params, header: {
      'content-type': 'application/json;charset=UTF-8'}}),

    //获取订单列表
    tradeList:(params) => http.get(URL + '/onlineClass/tradeList', { data: params, header: { 
      'content-type': 'application/json;charset=UTF-8'}}), 

    //创建支付订单
    createTrade:(params) => http.post(URL + '/onlineClass/createTrade', { data: params, header: { 
      "Content-Type": "application/x-www-form-urlencoded"}}), 
    
    //支付验证
    verifyTrade:(params) => http.get(URL + '/onlineClass/verifyTrade', { data: params, header: { 
      'content-type': 'application/json;charset=UTF-8'}}), 
      
    //支付
    createPay:(params) => http.post(URL + '/onlineClass/createPay', { data: params, header: { 
      "Content-Type": "application/x-www-form-urlencoded"}}), 

    //获取线上面授班列表
    myClassList:(params) => http.get(URL + '/onlineClass/myClassList', { data: params, header: {
      'content-type': 'application/json;charset=UTF-8'}}),
      
}