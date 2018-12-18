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
    activity_id: 0,
  },

  /**
   * 获取优惠券
   */
  getCoupon: function(e){
    console.log(e);
    wxb.that.setData({
      activity_id: e.target.dataset.id,
    });
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/user/Receive', {
      openid: wxb.getOpenId(),
      activity_id: wxb.that.data.activity_id,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '领取成功！',
      })
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

    this.getActivity();
  },

  
  getActivity: function(e){
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/Activity/geTactivity', {
      openid: wxb.getOpenId(),
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