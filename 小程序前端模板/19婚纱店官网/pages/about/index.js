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

  toTel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },

  map: function () {
    wx.openLocation({
      latitude: Number.parseFloat(wxb.that.data.lat),
      longitude: Number.parseFloat(wxb.that.data.lng),
      scale: 28
    });
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

    this.getAboutIndex();
  },

  /**
   * 获取关于数据
   */
  getAboutIndex: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/sheying.index/about', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        lat: data.lat,
        lng: data.lng,
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