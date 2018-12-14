//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
  },
  goback: function () {
    wx.navigateBack({
      delta: 100
    })
  },
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();


  }
})
