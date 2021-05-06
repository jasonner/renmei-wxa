// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : event.body,
    "outTradeNo" : event.orderid,
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1470026402",
    "totalFee" : parseInt(event.money),
    "envId": "cloud1-2gc5yfup092a8953",
    "functionName": "payCallBack",
    "nonceStr":event.nonceStr,
    "tradeType":"JSAPI"
  })
  return res
}