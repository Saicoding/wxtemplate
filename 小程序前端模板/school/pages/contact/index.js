//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    datas: [],

    markers: [],
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getAbout();
  },

  /**
   * 加载联系我们的信息
   */
  getAbout: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/school.index/about', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        markers: [{
          iconPath: "/img/icon_location.png",
          id: 0,
          latitude: data.lat,
          longitude: data.lng,
          width: 50,
          height: 50
        }],
      });
    });
  }
})
