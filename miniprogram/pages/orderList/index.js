// miniprogram/pages/orderList/index.js
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
    TabNum:'0'
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //Tab切换
  tanbChange(e){
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      TabNum: e.currentTarget.dataset.index
    })
  },

  //去支付
  PayBtn(e){
    wx.navigateTo({
      url: '../payList/index',
    })
  }
})