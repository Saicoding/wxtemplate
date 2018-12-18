//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    datas: [],
  },

  onShow: function(e){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  },

  onLoad: function(e){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/zhuangxiu.data/getList', {

    }, function (data) {
      console.log(data);
      wx.hideLoading();
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
      title: '巅峰互联装修',
      path: '/pages/home/index',
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

});
