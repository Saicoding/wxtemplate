// detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    more: 1,
    keywords: '',
    page:1,
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

    this.getList();
  },

  more: function (e) {
    this.getList();
  },

  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.detail.tel,
    })
  },

  formBindsubmit: function (e) {
    this.setData({
      keywords: e.detail.value.keywords,
      page: 1,
      detail: [],
    })
    this.getList();
  },

  getList: function () {
    wxb.Post('/api/company.store/bespeak', {
      openid: wxb.getOpenId(),
      keywords: wxb.that.data.keywords,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading(),
        wxb.that.setData({
          detail: data,
          more: data.more,
          page: wxb.that.data.page+1,
        })
    });
  }


})