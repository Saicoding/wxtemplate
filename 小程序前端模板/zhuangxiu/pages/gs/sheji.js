//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    id: 0,
  },

  onLoad: function (e) {
    console.log(e);

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wxb.that.setData({
      id: e.company_id,
    })
  },

  formBindsubmit: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    var param = e.detail.value;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.index/bespeak', {
      openid: wxb.getOpenId(),
      name: param.name,
      mobile: param.mobile,
      content: param.content,
      company_id: wxb.that.data.id,
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
