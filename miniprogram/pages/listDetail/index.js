// miniprogram/pages/listDetail/index.js
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
    TabNum:'0',
    detailList:[],
    videoSouceUrl:'',
    urlId:'',
    status:'1',
  },
  onLoad(e){
    console.log(e);
    this.getvideoList(e.urlId);
    this.setData({
      urlId:e.urlId
    })
  },

  //获取视频详情列表
  getvideoList(id){
    console.log(id);
    let that = this;
    hrp.getVideoList({
      classId:id,
      page:1,
      pageSize:10,
      token:app.globalData.token
    }).then((resData)=>{
      console.log(resData);
      if(resData.data.code && resData.data.code == "200"){
        if(resData.data.object){
          for(var i=0;i<resData.data.object.list.length;i++){
            // resData.data.object.list[i].duration = that.timestampToTime(resData.data.object.list[i].duration);
            resData.data.object.list[i].startTime = that.timestampToTime(resData.data.object.list[i].startTime);
          }
          that.setData({
            detailList:resData.data.object,
            videoSouceUrl:resData.data.object.list[1].playUrl,
            status:resData.data.object.list[1].status
          });
        }
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

  //视频播放切换
  couseTabChange(e){
    //console.log(e.currentTarget.dataset.index);
    this.setData({
      TabNum:e.currentTarget.dataset.index,
      videoSouceUrl:this.data.detailList.list[e.currentTarget.dataset.index].playUrl
    })
  },

  //支付页面
  goPayList(e){
    console.log(e);
    wx.redirectTo({
      url: '../payList/index?urlId='+this.data.urlId,
    })
  },
  
  //时间戳转时间
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + '日';
    var h = date.getHours();
    var mm = date.getMinutes();
    // var s = time.getSeconds();
    return M+D+' '+this.add0(h)+':'+this.add0(mm);
  },

  add0(m){
    return m<10?'0'+m:m 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res);
    // if(res.from && res.from == "button"){
    //   return{
    //     title:'',
    //     path:'pages/index/index',
    //   }
    // }
  },
})