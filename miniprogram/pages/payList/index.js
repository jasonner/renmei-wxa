// miniprogram/pages/payList/index.js
const app = getApp()
const util = require('../../utils/util.js');
import pageUtil from '../../utils/page-util.js';
const hrp = require('../../api/hrp.js');
import http from '../../utils/http.js';
import config from '../../env/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlId:'',
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      urlId:options.urlId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.getPayList(this.data.urlId);
  },

  //获取支付订单
  getPayList(id){
    let that = this;
    hrp.createTrade({
      'classId':id,
      'payType':'2',
      'payWay':'1',
      'token':app.globalData.token
    }).then((resData)=>{
      console.log(resData.data);
      if(resData.data.code && resData.data.code == '200'){
        console.log('adadada')
          that.setData({
            orderList:resData.data.object
          })
          console.log(that.data.orderList)
      }else{
        wx.showModal({
          title: '提示',
          content: resData.data.msg,
          showCancel:false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({ changed: true });
            } 
          }
        })
      }
    })
  },

  //支付按钮
  payBtn(){
    this.verifyTrade();
  },

  //拉起
  verifyTrade(){
      let that = this;
      wx.login({
        timeout: 50000,
        success:(result) =>{
          console.log(result.code);
          var code = result.code;
          wx.cloud.callFunction({
            // 云函数名称
            name: 'login',
            // 传给云函数的参数
            data: {},
            success: function(res) {
              console.log(res.result.openid) // 3
              var openid= res.result.openid;
              hrp.createPay({
                'appId':'wxba0d435b258ea03e',
                'classId':that.data.orderList.classId,
                'payWay':'1',
                'payId':that.data.orderList.id,
                'payType':'2',
                'openId':openid,
                'code':code,
                'oldPrice':that.data.orderList.price,
                'token':app.globalData.token
              }).then((resData)=>{
                if(resData.data.code && resData.data.code == '200'){
                  wx.requestPayment({
                    'timeStamp': resData.data.object.timeStamp,
                    'nonceStr':  resData.data.object.nonceStr,
                    'package':  resData.data.object.package,
                    'signType':  resData.data.object.signType,
                    'paySign':  resData.data.object.paySign,
                    success (res) { 
                      console.log(res);
                      if(res.data.code && res.data.code =='200'){
                        wx.navigateTo({
                          url: '../OrderComplete/index'
                        })
                      }
                    },
                    fail (res) {
                      console.log(res);
                      wx.showToast({
                        title: resData.data.msg,
                        icon: 'error',
                        duration: 2000
                      })
                     }
                  })
                }else{
                  wx.showToast({
                    title: resData.data.msg,
                    icon: 'error',
                    duration: 2000
                  })
                }
              })
            },
            fail: console.error
          })
        }
      })
  },
})