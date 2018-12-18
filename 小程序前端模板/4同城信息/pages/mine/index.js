//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    userinfo: [],
    type: 0,
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },
})
