//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {

  },
  onLoad: function () {
    console.log('onLoad');
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  fromSubmit: function (e) {
    console.log('fromSubmit');
    var params = e.detail.value;
    console.log(e);
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });



    wxb.Post('/api/company.index/tender', {
      openid: wxb.getOpenId(),
      code: wxb.getStoreCode(),
      hssy: params.hssy,
      hsch: params.hsch,
      hslf: params.hslf,
      hlgp: params.hlgp,
      xngz: params.xngz,
      hyjd: params.hyjd,
      hczp: params.hczp,
      hlsy: params.hlsy,
      name: params.name,
      mobile: params.mobile,
      content: params.content,

    }, function (data) {
      console.log(data);
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
      });

      var pages = getCurrentPages()
      var num = pages.length
      wx.navigateBack({
        delta: num - 1,
      })
    });
  },
})
