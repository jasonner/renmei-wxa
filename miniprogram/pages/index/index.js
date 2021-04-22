//index.js
const app = getApp()

Page({
  data: {
    TabNum:'0',
    headerList:[{
      imgSrc:'../../images/index/list1.png',
      text:'书法专区'
    },
    {
      imgSrc:'../../images/index/list2.png',
      text:'人物专区'
    },
    {
      imgSrc:'../../images/index/list3.png',
      text:'花鸟专区'
    },
    {
      imgSrc:'../../images/index/list4.png',
      text:'山水专区'
    }],
    PopupShow:false
  },
  onLoad(){

  },

  // TAB切换
  tanbChange(e){
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      TabNum: e.currentTarget.dataset.index
    })
  },

  //获取详情
  getListDetail(e){
    console.log(e);
    this.setData({
      PopupShow:true
    })
    // wx.navigateTo({
    //   url: '../listDetail/index',
    // })
  },

  //获取手机号
  getPhoneNumber(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData);
    if(e.detail.errMsg == 'getPhoneNumber:ok'){
        wx.navigateTo({
          url: '../listDetail/index',
        })
      }
    this.setData({
      PopupShow:false
    })
  }
})
