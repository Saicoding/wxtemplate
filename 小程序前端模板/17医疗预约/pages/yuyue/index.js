// pages/yuyue/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    name: '',
    mobile: '',
    date: '',
    intention: '',
    demand: '',

    setting: [],
  },

  onShow: function (e) {
    wxb.that = this;
    wxb.style();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wxb.that.data.setting);
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  /**
   * 预约日期选择
   */
  bindDateChange: function (e) {
    wxb.that.setData({
      date: e.detail.value,
    });
  },

  callPhone: function(e){
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },


  yuyue: function (e) {
    var params = e.detail.value;
    wxb.that.setData({
      name: params.name,
      mobile: params.mobile,
      date: wxb.that.data.date,
      intention: params.intention,
      demand: params.demand,
    });
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/yiliao.manage/enroll', {
      openid: wxb.getOpenId(),
      type: 2,
      name: params.name,
      mobile: params.mobile,
      date: wxb.that.data.date,
      intention: params.intention,
      demand: params.demand,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '预约成功!',
      });
      wxb.that.setData({
        name: '',
        mobile: '',
        date: '',
        intention: '',
        demand: '',
      });
    });
  },

  /**
   * 清除信息
   */
  clearInfo: function (e) {
    wxb.that.setData({
      name: '',
      mobile: '',
      date: '',
      intention: '',
      demand: '',
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