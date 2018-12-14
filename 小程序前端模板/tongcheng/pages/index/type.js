//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    categorys: [],

  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getTypeList();

  },

  /**
   * 获取分类列表
   */
  getTypeList: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/tongcheng.index/getCategory', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        categorys: data.category,
      });
    });
  },
})
