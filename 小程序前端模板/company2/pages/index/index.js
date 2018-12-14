//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    datas: [],

    setting: [],
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
    wxb.Post('/api/companygw.index/index', {

    }, function (data) {
      wx.hideLoading();
      console.log(data.banner);
      wxb.that.setData({
        datas: data,
      })
    });
  },

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '企业官网',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '已转发',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
  
})
