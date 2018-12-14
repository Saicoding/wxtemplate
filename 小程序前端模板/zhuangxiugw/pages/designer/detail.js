// pages/tuan/detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas: [],
    designer_id: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.setData({
      designer_id: options.designer_id,
    })
    this.getDatas();
  },

  getDatas: function () {
    wxb.Post('/api/zhuangxiugw.index/designerDetail', {
      designer_id: wxb.that.data.designer_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})