//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    userinfo: [],
    color: '',
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

  },
})
