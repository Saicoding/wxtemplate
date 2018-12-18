var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    money: 0,

    usecoupon: 1,
    hongbaolist: []
  },

  nouse: function (e) {
    this.setData({
      usecoupon: 0
    });
    wx.setStorageSync('nousehongbao', 1);
    wx.redirectTo({
      url: '/pages/mall/buy',
    })
  },
  yesuse: function (e) {
    this.setData({
      usecoupon: 1
    });
    wx.setStorageSync('userhongbao', 0);

    wx.setStorageSync('wxb_use_hongbao_id', e.target.dataset.id);
    wx.setStorageSync('wxb_use_hongbao_money', e.target.dataset.money);
    wx.redirectTo({
      url: '/pages/mall/buy',
    })
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();

    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.removeStorageSync('wxb_use_hongbao_id');
    wx.removeStorageSync('wxb_use_hongbao_money');
    wx.showLoading({
      title: '数据加载中',
    })
    wxb.Post('/api/user/getUseCoupon', {
      type: options.type,
      openid: wxb.getOpenId(),
      money: options.money,
    }, function (data2) {
      wxb.that.setData({
        hongbaolist: data2.list
      });
      
    });
    setTimeout(function(){
      wx.hideLoading();
    },2000);
   

  }
})