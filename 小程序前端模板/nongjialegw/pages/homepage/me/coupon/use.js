var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {


    usecoupon:1,

  },

  nouse:function(e){
      this.setData({
        usecoupon:0
      });
  },
  yesuse: function (e) {
    this.setData({
      usecoupon: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})