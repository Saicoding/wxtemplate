// pages/index/join.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas: [],

    lat: '',
    lng: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    wxb.that.setData({
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng'),
    });



    this.getIndex();
  },

  map: function () {
    wx.openLocation({
      latitude: Number.parseFloat(wxb.that.data.lat),
      longitude: Number.parseFloat(wxb.that.data.lng),
      scale: 28
    });
  },

  /**
   * 加载预约列表数据
   */
  getIndex: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/hair.index/getIndex', {
      openid: wxb.getOpenId(),
      lat: wxb.that.data.lat,
      lng: wxb.that.data.lng,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})