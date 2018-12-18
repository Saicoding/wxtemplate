// pages/arond/fragment/find.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    money:0
  },

  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    var money = options.money ?   options.money:0;
    var type = options.type ? options.type:0 ;
    wxb.that.setData({
        type:type,
        money:money
    });
  }

})