//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    statout: 0,
    stayin: 0,
    stayok: 0,
    tel: 0,
  },

  tel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.tel,
    })
  },
  onShow: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式 
    wxb.Post("/api/data/getSetting", {}, function (data) {
      wxb.that.setData({
        tel: data.service_tel
      })
    });
    var code = wxb.getStoreCode()
    if (!code) {
      wx.showLoading({
        title: '正在加载中',
      })
      setTimeout(function () {
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/public/storeLogin',
        })
      }, 500);
    } else { //获取商家的数据
      wxb.Post('/api/taocan.manage/countOrder', {
        code: code,
        openid: wxb.getOpenId(),
      }, function (data) {
        console.log(data);
        wx.hideLoading();
        wxb.that.setData({
          stayin: data['stayin'],
          stayok: data['stayok'],
          statout: data['statout'],
        });
      });
    }
  }
})
