//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    id:0,
  },

  onShow: function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  },

  onLoad: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wxb.that.setData({
      id:e.id,
    })
  },
  formBindsubmit: function (e) {
    var param = e.detail.value;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.index/bespeak', {
      openid: wxb.getOpenId(),
      name:param.name,
      mobile: param.mobile,
      content: param.content,
      company_id:wxb.that.data.id,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.navigateBack({
      })
    });
  },


})
