// pages/index/activity.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    work_id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    this.setData({
      work_id: options.work_id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  sub: function (e) {
    var params = e.detail.value;
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/zhuangxiugw.member/gonfdi', {
      work_id: wxb.that.data.work_id,
      name: params.name,
      mobile: params.tel,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '申请成功',
        icon: 'success',
      })
      setTimeout(function () {
        wx.navigateBack({
        })
      }, 2000)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})