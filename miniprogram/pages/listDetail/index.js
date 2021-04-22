// miniprogram/pages/listDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabNum:'0'
  },
  onLoad(){

  },

  goPayList(e){
    console.log(e);
    wx.redirectTo({
      url: '../payList/index',
    })
  },
  

})