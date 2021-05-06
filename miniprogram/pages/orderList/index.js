// miniprogram/pages/orderList/index.js
const app = getApp()
const util = require('../../utils/util.js');
import pageUtil from '../../utils/page-util.js';
const hrp = require('../../api/hrp.js');
const customer = require('../../api/customer.js');
import http from '../../utils/http.js';
import config from '../../env/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTabArr:[{
      title:"全部"
    },{
      title:"待支付"
    },{
      title:"已完成"
    },{
      title:"已取消"
    }],
    TabNum:'0',
    bottomTipShow:false,
    pageSize:10,
    totleCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrderList(this.data.TabNum);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.totleCount>this.data.pageSize){
      this.data.pageSize+=10;
      this.getOrderList(this.data.TabNum);
    }else{
      this.setData({
        bottomTipShow:true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取订单列表
  getOrderList(id){
    let that = this;
    hrp.tradeList({
      status:id,
      page:1,
      pageSize:that.data.pageSize,
      token:app.globalData.token
    }).then((resData)=>{
      console.log(resData.data);
      if(resData.data.code && resData.data.code=="200"){
        if(resData.data.object.list && resData.data.object.list.length>0){
          for( var i=0;i<resData.data.object.list.length;i++){
            resData.data.object.list[i].createTime = that.timestampToTime(resData.data.object.list[i].createTime);
          };
          that.setData({
            classList:resData.data.object.list,
            totleCount:resData.data.object.count
          });
          if(resData.data.object.count<=10){
            that.setData({
              bottomTipShow:false
            });
          }
        }else{
          that.setData({
            classList:[]
          });
          wx.showToast({
            title: '暂无数据',
            icon: 'error',
            duration: 2000
          });
        }
      }
    })
  },

  //Tab切换
  tanbChange(e){
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      TabNum: e.currentTarget.dataset.index
    });
    that.getOrderList(e.currentTarget.dataset.index);
  },

  //查看详情
  lookDetail(e){
    // if(e.currentTarget.dataset.status == "2"){
      wx.navigateTo({
        url: '../listDetail/index?urlId='+e.currentTarget.dataset.index,
      });
    // };
  },

  //去支付
  PayBtn(e){   
    hrp.createTrade({
      'classId':e.currentTarget.dataset.index,
      'payType':'2',
      'payWay':'1',
      'token':app.globalData.token
    }).then((resData)=>{
      console.log(resData.data);
      if(resData.data.code && resData.data.code == '200'){
        wx.navigateTo({
          url: '../payList/index?urlId='+e.currentTarget.dataset.index,
        })
      }else{
        wx.showModal({
          title: '提示',
          content: resData.data.msg,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  //时间戳转时间
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    return Y + M + D;
  },

})