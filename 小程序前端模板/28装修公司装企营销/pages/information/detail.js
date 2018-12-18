//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
  },

  onShow: function () {

    wxb.that = this;
    wxb.style();

  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '巅峰互联装修官网',
      path: '/pages/information/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
