//index.js
const app = getApp()
const util = require('../../utils/util.js');
import pageUtil from '../../utils/page-util.js';
const hrp = require('../../api/hrp.js');
const customer = require('../../api/customer.js');
import http from '../../utils/http.js';
import config from '../../env/config.js';
Page({
  data: {
    TabNum:'2',
    pageSize:10,
    totleCount:'',
    hasUser:false,
    code:'',
    headerList:[],
    contentList:[],
    PopupShow:false,
    bottomTipShow:false
  },

  onReady(){
    let that  = this;
    wx.login({
      timeout: 50000,//超时时间
      success: (result) => {
        console.log(result);
        customer.checkLogin({ 'code':result.code}).then((res) => {
          if (res.data.code && res.data.code == '200') {
            that.setData({
              hasUser:true
            });
            app.globalData.token = res.data.object.token;
          } else {
            that.setData({
              hasUser:false
            })
          }
        });
      },
      fail: (res) => {
        console.log(res);
      },
      complete: (res) => {
        console.log(res)
      },
    });
  },
  onLoad(){
    this.getColumn();
  },

  //获取栏目分类
  getColumn(){
    let that = this;
    hrp.getColumn().then((res) => {
      console.log(res.data)
      if (res.data.code && res.data.code == '200') {
        if(res.data.object && res.data.object.length>0){
          that.setData({
            headerList:res.data.object,
            TabNum:res.data.object[0].id
          });
          that.getList(that.data.TabNum);
        }
      } else {
        //TODO
        console.log("获取数据失败");
      }
    })
  },

  // TAB切换
  tanbChange(e){
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      TabNum: e.currentTarget.dataset.index
    });
    that.getList(that.data.TabNum);
  },

  //获取列表
  getList(id){
    console.log(id);
    let that  = this;
    hrp.getclassList({'taxon':id,'page':1,'pageSize':that.data.pageSize}).then((res) =>{
      console.log(res.data);
      if (res.data.code && res.data.code == '200') {
        if(res.data.object.list && res.data.object.list.length>0){
          for( var i=0;i<res.data.object.list.length;i++){
            res.data.object.list[i].createTime = that.timestampToTime(res.data.object.list[i].createTime);
          }
          that.setData({
            contentList:res.data.object.list,
            totleCount:res.data.object.count
          });
          if(res.data.object.count<=10){
            that.setData({
              bottomTipShow:false
            });
          }
        }else{
          that.setData({
            contentList:[],
          });
          wx.showToast({
            title: '暂无数据',
            icon: 'error',
            duration: 2000
          });
        }
      } else {
        //TODO
        console.log("获取数据失败");
      }
    }) 
  },

  //获取详情
  getListDetail(e){
    console.log(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.type+"支付状态");
    if(!this.data.hasUser){
      this.setData({
        PopupShow:true
      })
    }else{
      wx.navigateTo({
        url: '../listDetail/index?urlId='+e.currentTarget.dataset.index,
      })
    }
  },
    
  //获取手机号
  getPhoneNumber(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData);
    let that = this;
    console.log(that);
    this.setData({
      PopupShow:false
    })
    if(e.detail.errMsg == 'getPhoneNumber:ok'){
      wx.login({
        success: (result) => {
          console.log(result);
          customer.bindLogin({ 'code':result.code,'encryptedData':e.detail.encryptedData,'iv':e.detail.iv}).then((res) => {
            console.log(res.data.code)
            if (res.data.code && res.data.code == '200') {
              that.setData({
                hasUser:true
              })
            } else {
              that.setData({
                hasUser:false
              })
            }
          });
        },
      })
    }else{
        console.log('用户拒绝获取手机号');
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res);
  },

    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   console.log(this.data.totleCount);
   console.log(this.data.pageSize);
    if(this.data.totleCount>this.data.pageSize){
      this.data.pageSize+=10;
      this.getList(this.data.TabNum);
    }else{
      this.setData({
        bottomTipShow:true
      })
    }
  },
})
