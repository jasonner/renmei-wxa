// miniprogram/pages/myClass/index.js
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
    listStatus:'已下线',
    selectTabArr:[{
      title:"全部"
    },{
      title:"可观看"
    },{
      title:"已下线"
    },{
      title:"已删除"
    }],
    TabNum:'0',
    bottomTipShow:true,
    classList:[],
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
    this.getClssList(this.data.TabNum);
  },

 
  //Tab切换
  tanbChange(e){
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      TabNum: e.currentTarget.dataset.index
    });
    that.getClssList(that.data.TabNum);
  },

  //获取课程列表
  getClssList(id){
    let that = this;
    hrp.myClassList({
      status:id,
      page:1,
      pageSize:10,
      token:app.globalData.token
    }).then((resData)=>{
      console.log(resData.data);
      if(resData.data.code && resData.data.code=="200"){
        if(resData.data.object.list && resData.data.object.list.length>0){
          for( var i=0;i<resData.data.object.list.length;i++){
            resData.data.object.list[i].createTime = that.timestampToTime(resData.data.object.list[i].createTime);
          }
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

  //获取详情
  getListDetail(e){
    console.log(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.type+"可观看状态");
    if(e.currentTarget.dataset.type =='1'){
      wx.navigateTo({
        url: '../listDetail/index?urlId='+e.currentTarget.dataset.index,
      })
    }
  },

  //时间戳转时间
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() + 1 < 10 ? '0' + ( date.getDate() + 1) : date.getDate() + 1) + ' ';
    return M + D;
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
    console.log('到底了');
    if(this.data.totleCount>this.data.pageSize){
      this.data.pageSize+=10;
      this.getClssList(this.data.TabNum);
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

})