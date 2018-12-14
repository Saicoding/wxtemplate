// pages/menu/about.js
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
    setting:[],
    markers: [{
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50
    }],
  },

  /**
   * 去这里
   */
  goto: function (e) {
    wx.openLocation({
      name: wxb.that.data.setting.app_name,
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
    console.log(wxb.that.data.setting);
    this.getAboutInfo();

  },

  /**
   * 加载关于我们信息
   */
  getAboutInfo: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/yiliao.index/line', {
      openid: wxb.getOpenId(),
    }, function (data) {
      var markers = [{
        id: 0,
        latitude: data.lat,
        longitude: data.lng,
        width: 50,
        height: 50
      }];
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        markers: markers,
        lng: data.lng,
        lat: data.lat,
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