var app = getApp();
var wxb = require('../../../../utils/wxb.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    money:0,

    usecoupon:1,
    hongbaolist:[]
  },

  nouse:function(e){
      this.setData({
        usecoupon:0
      });
      wx.setStorageSync('nousehongbao', 1);
      var page = getCurrentPages();
      var back = page.length - 2;
      console.log(back);

      wx.navigateBack({ delta: back });
  },
  yesuse: function (e) {
    this.setData({
      usecoupon: 1
    });
    wx.setStorageSync('userhongbao', 0);

    wx.setStorageSync('wxb_use_hongbao_id',e.target.dataset.id);
    wx.setStorageSync('wxb_use_hongbao_money', e.target.dataset.money);
    var page = getCurrentPages();
    console.log(page);
    var back = page.length - 2;
    wx.navigateBack({ delta: back });
  },
  onLoad: function (options) {
      wxb.that = this;   //正确打开巅峰互联的方式
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式

      if (!wxb.checkAuthLogin(true)) {
        wxb.login();
      }
      wx.removeStorageSync('wxb_use_hongbao_id');
      wx.removeStorageSync('wxb_use_hongbao_money');

      wxb.Post('/api/user/getUseCoupon', {
        type: options.type,
        openid: wxb.getOpenId(),
        money: options.money,
      }, function (data2) {
        wxb.that.setData({
          hongbaolist: data2.list
        });

      });


  }
})