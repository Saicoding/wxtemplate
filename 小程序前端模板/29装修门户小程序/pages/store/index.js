// index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/company.store/getDetail', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading(),
        wxb.that.setData({
          detail: data,
        })

    });
  },
})