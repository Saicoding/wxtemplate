var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas: [],
  },

  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    this.getHome();
  },

  getHome: function (e) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/companygw.index/getCompany', {

    }, function (data) {
      console.log(data);
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      })
    });
  }
})