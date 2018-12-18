var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({
  data: {
    id: 0,
    detail: [],
    num: 0,
  },
  onLoad: function (options) {
   // options.id = 1;
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!options.id) {
      wx.showToast({
        title: '参数错误',
      })
    } else {
      wxb.that.setData({
        id: options.id,
      });
    }
    wx.getLocation({
      success: function (res) {
        wxb.Post('/api/hotel.index/detail', {
          id: wxb.that.data.id,
          lat: res.latitude,
          lng: res.longitude
        }, function (data) {
          wxb.that.setData({
            detail: data.detail,
            num: data.num
          });
        });

      },
    });
  }
})
